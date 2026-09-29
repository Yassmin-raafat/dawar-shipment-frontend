export type ShipmentStatus = "FINDING_DRIVER" | "ASSIGNED" | "ON_THE_WAY" | "DELIVERED";

export type Shipment = {
  id: string; orderNumber: string; status: ShipmentStatus; pickupAddress: string; deliveryAddress: string;
  deliveryFee: number; vehicleType: "SCOOTER" | "VAN" | "CAR" | "TRUCK"; recipientName?: string;
};

export type DriverShipment = Shipment & {
  customerId: string; driverId: string; weight: number; pickupLat: number; pickupLng: number; pickedUpAt: string | null;
  deliveryLat: number; deliveryLng: number; deliveredAt: string | null; price: string;
  paymentMethod: "CASH" | "CARD" | "APPLE_PAY"; paymentStatus: "PENDING" | "PAID" | "FAILED" | "REFUNDED";
};

export type Pagination = { totalElements: number; currentPage: number; size: number; totalPages: number; hasNextPage: boolean; hasPrevPage: boolean };
