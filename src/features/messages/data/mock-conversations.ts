import type { Conversation, Message } from "@/features/messages/types/message";

export const mockConversations: (Conversation & { messages: Message[] })[] = [
  {
    id: "mahmoud", name: "Mahmoud Hassan", initials: "MH", avatarColor: "bg-[#e6ede5] text-[#46604a]",
    preview: "Arrived at Cairo Hub 4, unloading order #EG-49120-CAI now.", timestamp: "Just now", online: true, unreadCount: 0,
    subtitle: "Mercedes Sprinter 2500 (#08)", shipmentId: "EG-49120-CAI", dateLabel: "Today, November 14",
    messages: [
      { id: "mahmoud-1", sender: "Mahmoud Hassan", direction: "incoming", text: "Good morning Nour, I have started my morning shift. Sprinter #08 inspection completed with full tank.", timestamp: "08:32 AM" },
      { id: "mahmoud-2", sender: "Nour", direction: "outgoing", text: "Morning Mahmoud! You have 3 shipments assigned for Nasr City and 5th Settlement. Highest priority is order #EG-49120 for recipient Zeyad Waleed.", timestamp: "08:35 AM" },
      { id: "mahmoud-3", sender: "Mahmoud Hassan", direction: "incoming", text: "Got it. I passed Ring Road East checkpoint smoothly at 10:50 AM. Reached Cairo Hub 4 now to finalize package handover.", timestamp: "10:52 AM" },
    ],
  },
  {
    id: "zeyad", name: "Zeyad Waleed", initials: "ZW", avatarColor: "bg-[#eee6dc] text-[#79624b]",
    preview: "Can driver call upon arriving at Nasr City gate 2?", timestamp: "10:42 AM", online: true, unreadCount: 1,
    subtitle: "Recipient · Nasr City", shipmentId: "EG-49120-CAI", dateLabel: "Today, November 14",
    messages: [{ id: "zeyad-1", sender: "Zeyad Waleed", direction: "incoming", text: "Can driver call upon arriving at Nasr City gate 2?", timestamp: "10:42 AM" }],
  },
  {
    id: "omar", name: "Omar Farouk", initials: "OF", avatarColor: "bg-[#e2e9ef] text-[#476179]",
    preview: "Delivery completed in Heliopolis. Ready for next batch.", timestamp: "09:15 AM", online: false, unreadCount: 0,
    subtitle: "Fleet Courier · Heliopolis", dateLabel: "Today, November 14",
    messages: [{ id: "omar-1", sender: "Omar Farouk", direction: "incoming", text: "Delivery completed in Heliopolis. Ready for next batch.", timestamp: "09:15 AM" }],
  },
  {
    id: "dispatch", name: "Cairo Hub 4 Dispatch", initials: "CH", avatarColor: "bg-[#e8e3db] text-[#6b5b40]",
    preview: "Manifest updated for 18 morning shipments to Giza.", timestamp: "Yesterday", online: true, unreadCount: 0,
    subtitle: "Cairo Hub 4 · Dispatch team", dateLabel: "Yesterday, November 13",
    messages: [{ id: "dispatch-1", sender: "Cairo Hub 4 Dispatch", direction: "incoming", text: "Manifest updated for 18 morning shipments to Giza.", timestamp: "04:20 PM" }],
  },
  {
    id: "tarek", name: "Tarek Mostafa", initials: "TM", avatarColor: "bg-[#e5e8df] text-[#536047]",
    preview: "Vehicle inspection document uploaded for Honda Cargo.", timestamp: "Nov 13", online: true, unreadCount: 0,
    subtitle: "Honda Cargo · Fleet Courier", dateLabel: "November 13",
    messages: [{ id: "tarek-1", sender: "Tarek Mostafa", direction: "incoming", text: "Vehicle inspection document uploaded for Honda Cargo.", timestamp: "08:10 AM" }],
  },
  {
    id: "karim", name: "Karim Adel", initials: "KA", avatarColor: "bg-[#eee1dd] text-[#81554a]",
    preview: "Fuel receipt reimbursement approved for Cairo route.", timestamp: "Nov 12", online: false, unreadCount: 0,
    subtitle: "Fleet Courier · Cairo route", dateLabel: "November 12",
    messages: [{ id: "karim-1", sender: "Karim Adel", direction: "incoming", text: "Fuel receipt reimbursement approved for Cairo route.", timestamp: "03:45 PM" }],
  },
];
