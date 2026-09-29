export type ShipmentStatus = "ASSIGNED" | "ON_THE_WAY" | "DELIVERED" | "FINDING_DRIVER";
export type VehicleType = "SCOOTER" | "VAN" | "CAR" | "TRUCK";
export type PaymentMethod = "CASH" | "CARD" | "APPLE_PAY";
export type PaymentStatus = "PENDING" | "PAID" | "FAILED" | "REFUNDED";

/** The exact shipment shape returned by GET /api/v1/admins/get-by-status. */
export type Order = {
  id: string; orderNumber: string; status: ShipmentStatus; customerId: string; driverId: string | null; weight: number;
  pickupAddress: string; pickupLat: number; pickupLng: number; pickedUpAt: string | null;
  deliveryAddress: string; deliveryLat: number; deliveryLng: number; deliveredAt: string | null;
  vehicleType: VehicleType; price: string; paymentMethod: PaymentMethod; paymentStatus: PaymentStatus;
};

export type ShipmentCounts = { shipments: number };
