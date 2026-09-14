export type Shipment = {
  id: string;
  recipient: string;
  origin: string;
  destination: string;
  fee: number;
  status: "Pending" | "Ready for Pickup" | "Assigned";
  driverId?: string;
};
