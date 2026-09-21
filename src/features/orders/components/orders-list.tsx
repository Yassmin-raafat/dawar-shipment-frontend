import type { Order } from "@/features/orders/types/order";
import OrderCard from "./order-card";

export default function OrdersList({ orders, selectedId, onSelect, labels }: { orders: Order[]; selectedId?: string; onSelect: (id: string) => void; labels: Record<string, string> }) {
  return <div className="min-h-0 space-y-3 overflow-y-auto pe-1">{orders.map((order) => <OrderCard key={order.id} order={order} selected={order.id === selectedId} onSelect={() => onSelect(order.id)} labels={labels} />)}</div>;
}
