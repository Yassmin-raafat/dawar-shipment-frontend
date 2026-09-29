import type { DriverShipment, Pagination, Shipment, ShipmentStatus } from "@/features/shipments/types/shipment";
import api from "@/lib/axios";

type ApiResponse<T> = { status: string; message: string; data: T };

export async function getAvailableShipments(params: { page: number; size: number; search?: string }): Promise<{ data: Shipment[]; pagination: Pagination }> {
  const { data } = await api.get<ApiResponse<Shipment[]> & { pagination: Pagination }>("/api/v1/admins/shipments/available", { params });
  return { data: data.data, pagination: data.pagination };
}

export async function getDriverShipments(userId: string, status?: ShipmentStatus): Promise<DriverShipment[]> {
  const { data } = await api.get<ApiResponse<{ shipments: DriverShipment[] }>>("/api/v1/admins/get-driver-shipment-by-status", { params: { userId, ...(status ? { status } : {}) } });
  return data.data.shipments;
}

export async function getRecipientName(customerId?: string): Promise<string | null> {
  if (!customerId) return null;
  const { data } = await api.get<ApiResponse<Array<{ id: string; name: string }>>>("/api/v1/admins/users", { params: { page: 1, size: 100 } });
  return data.data?.find((user) => user.id === customerId)?.name ?? null;
}

export async function assignShipment({ shipmentId, userId }: { shipmentId: string; userId: string }): Promise<{ assignedCount: number }> {
  const { data } = await api.patch<ApiResponse<{ assignedCount: number }>>(`/api/v1/admins/drivers/${encodeURIComponent(userId)}/assign-shipments`, { shipmentIds: [shipmentId] });
  return data.data;
}
