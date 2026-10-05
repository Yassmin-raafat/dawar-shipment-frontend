let currentUserId: string | null = null;
const listeners = new Set<() => void>();

export function setMessagesCurrentUserId(id: string | null) {
  if (currentUserId === id) return;
  currentUserId = id;
  listeners.forEach((listener) => listener());
}

export function getMessagesCurrentUserId() {
  return currentUserId;
}

export function subscribeToMessagesCurrentUser(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}
