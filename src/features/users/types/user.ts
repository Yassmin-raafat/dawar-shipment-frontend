import type { Order, ShipmentStatus } from "@/features/orders/types/order";

export type UserRole = "USER" | "DRIVER" | "ADMIN";
export type UserStatus = "ACTIVE" | "INACTIVE" | "SUSPENDED";
export type User = {
  id: string; name: string; email: string | null; phoneNumber: string; profilePhotoUrl: string | null;
  profilePhotoPublicId: string | null; status: UserStatus; address: string | null; role: UserRole; birthDate: string; totalOrders: number;
};
export type UserShipmentsResponse = { userId: string; status?: ShipmentStatus; shipments: Order[] };
