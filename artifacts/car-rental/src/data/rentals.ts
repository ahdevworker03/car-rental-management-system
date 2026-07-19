import { Rental } from "./types";

// Using a fixed reference date for stability
const TODAY = "2025-01-15T12:00:00Z";

export const rentals: Rental[] = [
  {
    id: "r1",
    vehicleIds: ["v2"],
    customerId: "c1",
    startDate: "2025-01-10T12:00:00Z",
    endDate: "2025-01-15T12:00:00Z",
    dailyPrices: { "v2": 300000 },
    payments: [{ id: "p1", amount: 1500000, date: "2025-01-10T12:00:00Z" }],
    totalAmount: 1500000,
    status: "active"
  },
  {
    id: "r2",
    vehicleIds: ["v6"],
    customerId: "c3",
    startDate: "2025-01-14T12:00:00Z",
    endDate: "2025-01-16T12:00:00Z",
    dailyPrices: { "v6": 320000 },
    payments: [{ id: "p2", amount: 320000, date: "2025-01-14T12:00:00Z" }],
    totalAmount: 640000,
    status: "active"
  },
  {
    id: "r3",
    vehicleIds: ["v3"], // Let's pretend it was just returned but status is still active or something, or it's another vehicle
    customerId: "c5",
    startDate: "2025-01-15T12:00:00Z",
    endDate: "2025-01-20T12:00:00Z",
    dailyPrices: { "v3": 400000 },
    payments: [],
    totalAmount: 2000000,
    status: "active"
  },
  {
    id: "r4",
    vehicleIds: ["v1"],
    customerId: "c2",
    startDate: "2024-12-20T12:00:00Z",
    endDate: "2024-12-25T12:00:00Z",
    dailyPrices: { "v1": 350000 },
    payments: [{ id: "p3", amount: 1750000, date: "2024-12-20T12:00:00Z" }],
    totalAmount: 1750000,
    status: "ended",
    returnDate: "2024-12-25T12:00:00Z"
  },
  {
    id: "r5",
    vehicleIds: ["v5"],
    customerId: "c4",
    startDate: "2024-12-28T12:00:00Z",
    endDate: "2025-01-02T12:00:00Z",
    dailyPrices: { "v5": 250000 },
    payments: [{ id: "p4", amount: 1250000, date: "2024-12-28T12:00:00Z" }],
    totalAmount: 1250000,
    status: "ended",
    returnDate: "2025-01-02T12:00:00Z"
  },
  {
    id: "r6",
    vehicleIds: ["v7"],
    customerId: "c6",
    startDate: "2025-01-01T12:00:00Z",
    endDate: "2025-01-05T12:00:00Z",
    dailyPrices: { "v7": 200000 },
    payments: [{ id: "p5", amount: 1000000, date: "2025-01-01T12:00:00Z" }],
    totalAmount: 1000000,
    status: "ended",
    returnDate: "2025-01-05T12:00:00Z"
  },
  {
    id: "r7",
    vehicleIds: ["v4"],
    customerId: "c1",
    startDate: "2025-01-05T12:00:00Z",
    endDate: "2025-01-08T12:00:00Z",
    dailyPrices: { "v4": 800000 },
    payments: [{ id: "p6", amount: 2400000, date: "2025-01-05T12:00:00Z" }],
    totalAmount: 2400000,
    status: "ended",
    returnDate: "2025-01-08T12:00:00Z"
  }
];
