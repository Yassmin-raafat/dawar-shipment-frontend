export type OrderStatus = "Delivered" | "Pending" | "In Transit";

export type Order = {
  id: string;
  trackingId: string;
  status: OrderStatus;
  origin: string;
  destination: string;
  pickupDate: string;
  deliveryDate: string;
  recipient: { name: string; phone: string };
  driver: { id: string; name: string; role: string; initials: string; vehicle: string; vehicleImage?: string };
  fees: { base: number; tax: number; total: number };
  progress: number;
  coordinates: { origin: [number, number]; destination: [number, number] };
};
