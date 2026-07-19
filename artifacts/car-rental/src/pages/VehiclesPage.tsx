import { useState, useMemo } from "react";
import { useLocation } from "wouter";
import { Plus, Car } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { SearchBar } from "@/components/ui/SearchBar";
import { FilterChips } from "@/components/ui/FilterChips";
import { VehicleCard } from "@/components/ui/VehicleCard";
import { EmptyState } from "@/components/ui/EmptyState";
import {
  vehicles,
  getActiveRentals,
  getCustomerById,
} from "@/data";
import type { VehicleStatus } from "@/data";

type FilterValue = "all" | VehicleStatus;

const FILTER_OPTIONS = [
  { label: "الكل", value: "all" },
  { label: "متاحة", value: "available" },
  { label: "مؤجرة", value: "rented" },
  { label: "صيانة", value: "maintenance" },
] satisfies { label: string; value: FilterValue }[];

export default function VehiclesPage() {
  const [, setLocation] = useLocation();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<FilterValue>("all");

  // Build vehicleId → renterName map from active rentals (static data, no memo needed)
  const renterMap = useMemo(() => {
    const map: Record<string, string> = {};
    getActiveRentals().forEach((rental) => {
      const customer = getCustomerById(rental.customerId);
      if (customer) {
        rental.vehicleIds.forEach((vid) => {
          map[vid] = customer.name;
        });
      }
    });
    return map;
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return vehicles.filter((v) => {
      const matchesFilter = filter === "all" || v.status === filter;
      const matchesSearch =
        !q ||
        `${v.make} ${v.model}`.toLowerCase().includes(q) ||
        v.plate.toLowerCase().includes(q) ||
        v.year.toString().includes(q);
      return matchesFilter && matchesSearch;
    });
  }, [search, filter]);

  return (
    <div className="min-h-full">
      <PageHeader
        title="السيارات"
        action={
          <button
            onClick={() => setLocation("/vehicles/add")}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-primary text-primary-foreground active:scale-95 transition-transform"
            aria-label="إضافة سيارة"
          >
            <Plus className="w-5 h-5" strokeWidth={2.5} />
          </button>
        }
      />

      <div className="px-4 pt-4 pb-4 space-y-3">
        <SearchBar
          placeholder="ابحث باسم السيارة أو رقم اللوحة..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <FilterChips
          options={FILTER_OPTIONS}
          value={filter}
          onChange={(v) => setFilter(v as FilterValue)}
        />
      </div>

      <div className="px-4 pb-6 space-y-3">
        {filtered.length === 0 ? (
          search || filter !== "all" ? (
            <EmptyState
              icon={Car}
              title="لا توجد نتائج"
              description="جرّب تغيير كلمة البحث أو الفلتر"
              className="py-16"
            />
          ) : (
            <EmptyState
              icon={Car}
              title="لا توجد سيارات بعد"
              description="أضف أول سيارة للبدء"
              action={{
                label: "إضافة سيارة",
                onClick: () => setLocation("/vehicles/add"),
              }}
              className="py-16"
            />
          )
        ) : (
          filtered.map((vehicle) => (
            <VehicleCard
              key={vehicle.id}
              vehicle={vehicle}
              currentRenterName={renterMap[vehicle.id]}
              onClick={() => setLocation(`/vehicles/${vehicle.id}`)}
            />
          ))
        )}
      </div>
    </div>
  );
}
