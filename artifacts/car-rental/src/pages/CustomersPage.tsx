import { useState, useMemo } from "react";
import { useLocation } from "wouter";
import { Plus, Users } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { SearchBar } from "@/components/ui/SearchBar";
import { CustomerCard } from "@/components/ui/CustomerCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { customers, getRentalsForCustomer } from "@/data";

export default function CustomersPage() {
  const [, setLocation] = useLocation();
  const [search, setSearch] = useState("");

  // Pre-compute per-customer stats once (static mock data)
  const statsMap = useMemo(() => {
    const map: Record<string, { activeCount: number; remaining: number }> = {};
    customers.forEach((c) => {
      const all = getRentalsForCustomer(c.id);
      const active = all.filter((r) => r.status === "active");
      const remaining = active.reduce((sum, r) => {
        const paid = r.payments.reduce((s, p) => s + p.amount, 0);
        return sum + Math.max(0, r.totalAmount - paid);
      }, 0);
      map[c.id] = { activeCount: active.length, remaining };
    });
    return map;
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return customers;
    return customers.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.phone.toLowerCase().includes(q) ||
        c.location.toLowerCase().includes(q)
    );
  }, [search]);

  return (
    <div className="min-h-full">
      <PageHeader
        title="العملاء"
        action={
          <button
            onClick={() => setLocation("/customers/add")}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-primary text-primary-foreground active:scale-95 transition-transform"
            aria-label="إضافة عميل"
          >
            <Plus className="w-5 h-5" strokeWidth={2.5} />
          </button>
        }
      />

      <div className="px-4 pt-4 pb-3">
        <SearchBar
          placeholder="ابحث بالاسم أو رقم الهاتف..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="px-4 pb-6 space-y-3">
        {filtered.length === 0 ? (
          search ? (
            <EmptyState
              icon={Users}
              title="لا توجد نتائج"
              description="جرّب اسماً أو رقم هاتف مختلف"
              className="py-16"
            />
          ) : (
            <EmptyState
              icon={Users}
              title="لا يوجد عملاء بعد"
              description="أضف أول عميل للبدء"
              action={{
                label: "إضافة عميل",
                onClick: () => setLocation("/customers/add"),
              }}
              className="py-16"
            />
          )
        ) : (
          filtered.map((customer) => (
            <CustomerCard
              key={customer.id}
              customer={customer}
              activeRentalCount={statsMap[customer.id]?.activeCount ?? 0}
              remainingBalance={statsMap[customer.id]?.remaining ?? 0}
              onClick={() => setLocation(`/customers/${customer.id}`)}
            />
          ))
        )}
      </div>
    </div>
  );
}
