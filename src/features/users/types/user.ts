export type UserShipmentStatus = "In Progress" | "Delivered";

export type UserShipment = {
  id: string; dateTime: string; fee: number; status: UserShipmentStatus;
  origin: string; destination: string;
};

export type User = {
  id: string; name: string; phone: string; email: string; avatarUrl?: string;
  totalOrders: number; logisticsSpend: number; activeShipmentCount: number;
  fulfillmentRate: number; activeShipment?: UserShipment & { driver: string; progress: number };
  recentShipments: UserShipment[];
};
