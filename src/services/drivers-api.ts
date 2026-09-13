import type { Driver } from "@/features/drivers/types/driver";
import { addDriverSchema, type AddDriverPayload } from "@/features/drivers/schemas/add-driver-schema";

const drivers: Driver[] = [
  {
    id: "DRV-001",
    vehiclePhotoUrl: "/image%20296.png",
    role: "Senior Fleet Courier",
    hub: "Cairo Hub 4 (East Depot)",
    email: "ahmed.hassan@example.com",
    licenseClass: "Commercial Class A",
    vehicleColor: "Blue",
    plateNumber: "ج ن ا | ٤٩٢١",
    activeShipment: {
      recipient: "Zeyad Waleed", origin: "Nasr City DC",
      destination: "5th Settlement Hub", fee: 180, progress: 51,
    },
    recentDeliveries: [
      { id: "EG-38291-MAA", origin: "Cairo Hub 4", destination: "Maadi Degla", fee: 220, status: "Delivered" },
      { id: "EG-38104-HEL", origin: "Cairo Hub 4", destination: "Heliopolis Roxy", fee: 140, status: "Delivered" },
      { id: "EG-37980-GIZ", origin: "Cairo Hub 4", destination: "Giza Dokki", fee: 195, status: "Delivered" },
      { id: "EG-37825-NAS", origin: "Cairo Hub 4", destination: "Nasr City", fee: 160, status: "Delivered" },
    ],
    shiftActivity: [
      { id: "checkpoint", activity: "Checkpoint Clearance", location: "Ring Road East", time: "10:50 AM" },
      { id: "departure-4", activity: "Departed Hub", location: "Cairo Hub 4", time: "09:40 AM" },
      { id: "departure-3", activity: "Departed Hub", location: "Cairo Hub 4", time: "09:40 AM" },
      { id: "departure-2", activity: "Departed Hub", location: "Cairo Hub 4", time: "09:40 AM" },
      { id: "departure-1", activity: "Departed Hub", location: "Cairo Hub 4", time: "09:40 AM" },
      { id: "start", activity: "Shift Started", location: "Inspection Completed", time: "08:30 AM" },
    ],
    name: "Ahmed Hassan",
    phone: "+20 100 234 5678",
    vehicle: "Mercedes Sprinter",
    rating: 4.9,
    reliability: 98,
  },
  {
    id: "DRV-002",
    name: "Mona Adel",
    phone: "+20 111 783 9201",
    vehicle: "Ford Transit",
    rating: 4.8,
    reliability: 96,
  },
  {
    id: "DRV-003",
    name: "Omar Khaled",
    phone: "+20 122 605 1184",
    vehicle: "Peugeot Boxer",
    rating: 4.7,
    reliability: 94,
  },
  {
    id: "DRV-004",
    name: "Nour Samir",
    phone: "+20 101 556 7742",
    vehicle: "Renault Master",
    rating: 4.6,
    reliability: 91,
  },
  {
    id: "DRV-005",
    name: "Karim Fathy",
    phone: "+20 115 890 1123",
    vehicle: "Iveco Daily",
    rating: 4.9,
    reliability: 97,
  },
  {
    id: "DRV-006",
    name: "Sara Nabil",
    phone: "+20 120 443 8891",
    vehicle: "Mercedes Vito",
    rating: 4.5,
    reliability: 89,
  },
  {
    id: "DRV-007",
    name: "Youssef Tarek",
    phone: "+20 106 918 3304",
    vehicle: "Fiat Ducato",
    rating: 4.7,
    reliability: 93,
  },
  {
    id: "DRV-008",
    name: "Farida Wael",
    phone: "+20 102 731 2455",
    vehicle: "Nissan Urvan",
    rating: 4.4,
    reliability: 87,
  },
  {
    id: "DRV-009",
    name: "Mostafa Amin",
    phone: "+20 128 665 9002",
    vehicle: "Toyota HiAce",
    rating: 4.8,
    reliability: 95,
  },
  {
    id: "DRV-010",
    name: "Laila Hany",
    phone: "+20 112 504 6617",
    vehicle: "Hyundai H1",
    rating: 4.6,
    reliability: 90,
  },
  {
    id: "DRV-011",
    name: "Hassan Ezz",
    phone: "+20 114 222 8190",
    vehicle: "Ford Transit",
    rating: 4.3,
    reliability: 85,
  },
  {
    id: "DRV-012",
    name: "Reem Ashraf",
    phone: "+20 109 732 1188",
    vehicle: "Mercedes Sprinter",
    rating: 4.9,
    reliability: 99,
  },
  {
    id: "DRV-013",
    name: "Ali Sherif",
    phone: "+20 121 930 4401",
    vehicle: "Renault Master",
    rating: 4.5,
    reliability: 88,
  },
  {
    id: "DRV-014",
    name: "Nada Essam",
    phone: "+20 100 840 6172",
    vehicle: "Toyota HiAce",
    rating: 4.7,
    reliability: 92,
  },
  {
    id: "DRV-015",
    name: "Tamer Galal",
    phone: "+20 127 229 6538",
    vehicle: "Peugeot Boxer",
    rating: 4.2,
    reliability: 83,
  },
  {
    id: "DRV-016",
    name: "Dina Magdy",
    phone: "+20 111 646 7204",
    vehicle: "Iveco Daily",
    rating: 4.8,
    reliability: 96,
  },
  {
    id: "DRV-017",
    name: "Mazen Atef",
    phone: "+20 120 900 7721",
    vehicle: "Fiat Ducato",
    rating: 4.6,
    reliability: 90,
  },
  {
    id: "DRV-018",
    name: "Salma Yasser",
    phone: "+20 101 802 4390",
    vehicle: "Nissan Urvan",
    rating: 4.4,
    reliability: 86,
  },
  {
    id: "DRV-019",
    name: "Fady Nader",
    phone: "+20 115 372 8106",
    vehicle: "Hyundai H1",
    rating: 4.7,
    reliability: 93,
  },
  {
    id: "DRV-020",
    name: "Heba Raouf",
    phone: "+20 122 114 6829",
    vehicle: "Mercedes Vito",
    rating: 4.9,
    reliability: 98,
  },
];

export async function getDrivers() {
  await new Promise((resolve) => {
    setTimeout(resolve, 500);
  });

  return [...drivers];
}

function readPhoto(file?: File): Promise<string | undefined> {
  if (!file) return Promise.resolve(undefined);
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error("Could not read the photo. Please choose it again."));
    reader.readAsDataURL(file);
  });
}

export class DriverNotFoundError extends Error {
  constructor() {
    super("Driver not found.");
    this.name = "DriverNotFoundError";
  }
}

export async function getDriverById(id: string): Promise<Driver> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const driver = drivers.find((item) => item.id === id);
  if (!driver) throw new DriverNotFoundError();
  return driver;
}

// In-memory mock: new drivers remain available to refetches until a full reload.
export async function addDriver(payload: AddDriverPayload): Promise<Driver> {
  const values = addDriverSchema.parse(payload);
  await new Promise((resolve) => setTimeout(resolve, 700));
  const [avatarUrl, vehiclePhotoUrl] = await Promise.all([
    readPhoto(values.driverPhoto), readPhoto(values.vehiclePhoto),
  ]);
  if (drivers.some((driver) => driver.nationalId === values.nationalId)) {
    throw new Error("A driver with this National ID / License already exists.");
  }
  const driver: Driver = {
    id: "DRV-" + String(drivers.length + 1).padStart(3, "0"),
    name: values.name,
    phone: values.phone,
    vehicle: values.vehicle,
    nationalId: values.nationalId,
    hub: values.hub,
    plateNumber: values.plateNumber,
    vehicleColor: values.vehicleColor,
    avatarUrl,
    vehiclePhotoUrl,
    rating: 0,
    reliability: 0,
  };
  drivers.unshift(driver);
  return driver;
}
