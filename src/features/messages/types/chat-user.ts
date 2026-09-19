import type { Conversation } from "./message";

export type ChatUser = Pick<Conversation, "id" | "name" | "initials" | "avatarColor" | "online" | "subtitle" | "shipmentId">;
