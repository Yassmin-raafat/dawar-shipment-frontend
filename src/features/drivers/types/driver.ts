import type { Shipment } from "@/features/shipments/types/shipment";

export type DriverStatus = "PENDING_REVIEW" | "ACTIVE" | "REJECTED" | "SUSPENDED";

export type DriverListItem = {
  id: string;
  userId: string;
  name: string;
  phoneNumber: string;
  vehicleBrand: string;
  vehicleType: string;
  plateNumber: string;
  rating: number;
  status: DriverStatus;
};

export type DriverDetails = DriverListItem;

export type DriversPagination = {
  totalElements: number;
  currentPage: number;
  size: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
};

export type DriversPageResponse = {
  data: DriverListItem[];
  pagination: DriversPagination;
};

export type DriverShipment = {
  recipient: string;
  origin: string;
  destination: string;
  fee: number;
  progress: number;
};

export type DriverDelivery = {
  id: string;
  origin: string;
  destination: string;
  fee: number;
  status: "Delivered" | "Returned";
};

export type DriverActivity = {
  id: string;
  activity: string;
  location: string;
  time: string;
};

export type Driver = {
  id: string;
  name: string;
  avatarUrl?: string;
  phone: string;
  vehicle: string;
  rating: number;
  reliability: number;
  nationalId?: string;
  hub?: string;
  plateNumber?: string;
  vehicleColor?: string;
  vehiclePhotoUrl?: string;
  role?: string;
  email?: string;
  licenseClass?: string;
  activeShipment?: DriverShipment;
  assignedShipments?: Shipment[];
  recentDeliveries?: DriverDelivery[];
  shiftActivity?: DriverActivity[];
};
