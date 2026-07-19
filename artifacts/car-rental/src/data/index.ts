import { vehicles } from "./vehicles";
import { customers } from "./customers";
import { rentals } from "./rentals";
import { maintenance } from "./maintenance";

export * from "./types";
export { vehicles, customers, rentals, maintenance };

export const getVehicleById = (id: string) => vehicles.find(v => v.id === id);
export const getCustomerById = (id: string) => customers.find(c => c.id === id);
export const getRentalById = (id: string) => rentals.find(r => r.id === id);
export const getMaintenanceById = (id: string) => maintenance.find(m => m.id === id);

export const getActiveRentals = () => rentals.filter(r => r.status === "active");
export const getEndedRentals = () => rentals.filter(r => r.status === "ended");

export const getUpcomingMaintenance = () => maintenance.filter(m => m.status === "upcoming" || m.status === "overdue");
export const getCompletedMaintenance = () => maintenance.filter(m => m.status === "completed");

export const getRentalsForVehicle = (vehicleId: string) => rentals.filter(r => r.vehicleIds.includes(vehicleId));
export const getRentalsForCustomer = (customerId: string) => rentals.filter(r => r.customerId === customerId);

export const getMaintenanceForVehicle = (vehicleId: string) => maintenance.filter(m => m.vehicleId === vehicleId);

export const getTotalPaid = (rentalId: string) => {
  const rental = getRentalById(rentalId);
  if (!rental) return 0;
  return rental.payments.reduce((sum, p) => sum + p.amount, 0);
};

export const getTotalRemaining = (rentalId: string) => {
  const rental = getRentalById(rentalId);
  if (!rental) return 0;
  return Math.max(0, rental.totalAmount - getTotalPaid(rentalId));
};

export const getMonthlyRevenue = () => {
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  let revenue = 0;
  rentals.forEach(r => {
    r.payments.forEach(p => {
      const d = new Date(p.date);
      if (d.getMonth() === currentMonth && d.getFullYear() === currentYear) {
        revenue += p.amount;
      }
    });
  });
  return revenue;
};

export const getTotalPendingBalance = () => {
  let pending = 0;
  getActiveRentals().forEach(r => {
    pending += Math.max(0, r.totalAmount - getTotalPaid(r.id));
  });
  return pending;
};