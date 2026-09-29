import api from "@/lib/axios";
import type { ShipmentStatus } from "@/features/orders/types/order";
import type { User, UserShipmentsResponse } from "@/features/users/types/user";

type Pagination = { totalElements: number; currentPage: number; size: number; totalPages: number; hasNextPage: boolean; hasPrevPage: boolean };
type ApiResponse<T> = { status: string; message: string; data: T; pagination?: Pagination };
export type UsersPage = { data: User[]; pagination: Pagination | null };

export async function getUsers(page = 1, size = 100): Promise<UsersPage> {
  const { data } = await api.get<ApiResponse<User[]>>("/api/v1/admins/users", { params: { page, size } });
  return { data: data.data ?? [], pagination: data.pagination ?? null };
}

export async function getUserById(id: string): Promise<User | null> {
  const users = await getUsers();
  return users.data.find((user) => user.id === id) ?? null;
}

export async function getUserShipments(userId: string, status?: ShipmentStatus): Promise<UserShipmentsResponse> {
  const { data } = await api.get<ApiResponse<UserShipmentsResponse>>("/api/v1/admins/get-user-shipment-by-status", { params: { userId, ...(status ? { status } : {}) } });
  return data.data ?? { userId, shipments: [] };
}
