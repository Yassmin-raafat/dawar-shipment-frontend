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
  recentDeliveries?: DriverDelivery[];
  shiftActivity?: DriverActivity[];
};
