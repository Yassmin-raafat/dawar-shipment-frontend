import api from "@/lib/axios";
import type { Order, ShipmentCounts, ShipmentStatus } from "@/features/orders/types/order";

type ApiResponse<T> = { status: string; message: string; data: T };

export async function getOrders(status?: ShipmentStatus): Promise<Order[]> {
  const { data } = await api.get<ApiResponse<{ allShipments: Order[] }>>("/api/v1/admins/get-by-status", { params: status ? { status } : undefined });
  return data.data?.allShipments ?? [];
}

export async function getShipmentCounts(): Promise<ShipmentCounts> {
  const { data } = await api.get<ApiResponse<ShipmentCounts>>("/api/v1/admins/count-by-status");
  return data.data ?? { shipments: 0 };
}
