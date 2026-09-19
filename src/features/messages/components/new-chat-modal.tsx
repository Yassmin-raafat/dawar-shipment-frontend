"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { useChatUsers } from "../hooks/use-chat-users";
import { useCreateConversation } from "../hooks/use-create-conversation";
import type { Conversation } from "../types/message";
import ConversationAvatar from "./conversation-avatar";

export default function NewChatModal({ onClose, onSuccess }: { onClose: () => void; onSuccess: (conversation: Conversation) => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const submitting = useRef(false);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [selectedUserId, setSelectedUserId] = useState("");
  const { data: users = [], isLoading, error, refetch } = useChatUsers();
  const mutation = useCreateConversation();
  const term = search.trim().toLowerCase();
  const visibleUsers = users.filter((user) =>
    (filter === "all" || user.online === (filter === "online")) &&
    [user.name, user.subtitle, user.shipmentId ?? ""].some((value) => value.toLowerCase().includes(term)));

  useEffect(() => {
    const dialog = dialogRef.current;
    const previousFocus = document.activeElement;
    dialog?.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      dialog?.close();
      document.body.style.overflow = previousOverflow;
      if (previousFocus instanceof HTMLElement) previousFocus.focus();
    };
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selectedUserId || mutation.isPending || submitting.current) return;
    submitting.current = true;
    try {
      const conversation = await mutation.mutateAsync(selectedUserId);
      onSuccess(conversation);
      onClose();
    } catch {
      // Keep the selection and search intact so the user can retry.
    } finally { submitting.current = false; }
  }

  return <dialog ref={dialogRef} aria-labelledby="new-chat-title" onCancel={(event) => { event.preventDefault(); if (!submitting.current) onClose(); }} className="fixed inset-0 m-auto max-h-[90dvh] w-[calc(100%-2rem)] max-w-md overflow-y-auto rounded-2xl border border-border/30 bg-card p-5 text-text-primary shadow-xl backdrop:bg-black/30">
    <form onSubmit={handleSubmit}>
      <h2 id="new-chat-title" className="text-sm font-semibold">New Chat</h2>
      <p className="mt-1 text-xs text-text-secondary">Select a user to start a conversation.</p>
      <fieldset disabled={mutation.isPending} className="mt-4 space-y-3 disabled:opacity-60">
        <label className="block text-xs">Search users
          <input autoFocus type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search name, shipment ID..." className="mt-1 h-9 w-full rounded-xl border border-border/30 bg-[#f5f7fa] px-3 text-xs outline-none focus:border-primary" />
        </label>
        <label className="block text-xs">Availability
          <select value={filter} onChange={(event) => setFilter(event.target.value)} className="mt-1 h-9 w-full rounded-xl border border-border/30 bg-[#f5f7fa] px-3 text-xs">
            <option value="all">All users</option><option value="online">Online</option><option value="offline">Offline</option>
          </select>
        </label>
        <div className="max-h-64 overflow-y-auto">
          {isLoading ? <p role="status" className="py-6 text-center text-xs text-text-secondary">Loading users...</p>
            : error ? <div role="alert" className="py-6 text-center text-xs text-destructive">{error.message}<button type="button" onClick={() => void refetch()} className="mx-auto mt-2 block text-primary underline">Retry users</button></div>
            : visibleUsers.length ? <fieldset><legend className="sr-only">Available users</legend>{visibleUsers.map((user) => <label key={user.id} className={"flex cursor-pointer items-center gap-3 rounded-xl p-3 " + (selectedUserId === user.id ? "bg-primary-muted" : "hover:bg-secondary")}>
              <input type="radio" name="chat-user" value={user.id} checked={selectedUserId === user.id} onChange={() => setSelectedUserId(user.id)} className="accent-primary" />
              <ConversationAvatar conversation={user} />
              <span className="min-w-0 flex-1"><span className="block text-xs font-medium">{user.name}</span><span className="block text-[10px] text-text-secondary">{user.subtitle} · {user.online ? "Online" : "Offline"}</span></span>
            </label>)}</fieldset>
            : <p role="status" className="py-6 text-center text-xs text-text-secondary">{users.length ? "No users match your search or filter." : "No users available."}</p>}
        </div>
      </fieldset>
      {selectedUserId && <p className="mt-3 text-xs text-text-secondary">Selected: {users.find((user) => user.id === selectedUserId)?.name}</p>}
      {mutation.error && <p role="alert" className="mt-3 text-xs text-destructive">{mutation.error.message}</p>}
      <div className="mt-5 flex justify-end gap-2">
        <button type="button" disabled={mutation.isPending} onClick={onClose} className="rounded-xl border border-border/40 px-4 py-2 text-xs disabled:opacity-50">Cancel</button>
        <button type="submit" disabled={!selectedUserId || mutation.isPending} className="rounded-xl bg-primary px-4 py-2 text-xs text-white disabled:opacity-50">{mutation.isPending ? "Starting..." : "Start Conversation"}</button>
      </div>
    </form>
  </dialog>;
}
