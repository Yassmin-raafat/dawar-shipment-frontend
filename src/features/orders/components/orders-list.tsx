import type { Order, ShipmentStatus } from "@/features/orders/types/order";
import type { AdminUserLookup } from "@/services/shipments-api";
import type { DriverListItem } from "@/features/drivers/types/driver";
import OrderCard from "./order-card";

export default function OrdersList({ orders, recipients, drivers, selectedId, onSelect, labels }: { orders: Order[]; recipients: AdminUserLookup[]; drivers: DriverListItem[]; selectedId?: string; onSelect: (id: string) => void; labels: Record<ShipmentStatus, string> }) {
  return <div className="min-h-0 space-y-3 overflow-y-auto pe-1">{orders.map((order) => <OrderCard key={order.id} order={order} recipient={recipients.find((user) => user.id === order.customerId) ?? null} driver={order.driverId ? drivers.find((item) => item.userId === order.driverId) ?? null : null} selected={order.id === selectedId} onSelect={() => onSelect(order.id)} labels={labels} />)}</div>;
}
