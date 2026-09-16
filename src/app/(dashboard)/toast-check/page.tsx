"use client";
// Temporary QA harness for real service failures; removed after browser checks.
import { useState } from "react";
import AssignShipmentModal from "@/features/shipments/components/assign-shipment-modal";
import MessageInput from "@/features/messages/components/message-input";

export default function ToastCheck() {
  const [open, setOpen] = useState(false);
  return <><button onClick={() => setOpen(true)}>Test assignment failure</button>
    {open && <AssignShipmentModal driverId="missing-driver" driverName="QA missing driver" onClose={() => setOpen(false)} onSuccess={() => {}} />}
    <MessageInput conversationId="missing-conversation" recipient="QA missing recipient" />
  </>;
}
