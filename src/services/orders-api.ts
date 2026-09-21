import { mockOrders } from "@/features/orders/data/mock-orders";
import type { Order } from "@/features/orders/types/order";

export async function getOrders(): Promise<Order[]> {
  await new Promise((resolve) => setTimeout(resolve, 450));
  return mockOrders.map((order) => ({ ...order, recipient: { ...order.recipient }, driver: { ...order.driver }, fees: { ...order.fees } }));
}
