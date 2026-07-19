import { useState } from "react";
import { useLocation } from "wouter";
import { Plus, Wrench } from "lucide-react";

import { PageHeader } from "@/components/layout/PageHeader";
import { FilterChips } from "@/components/ui/FilterChips";
import { SearchBar } from "@/components/ui/SearchBar";
import { EmptyState } from "@/components/ui/EmptyState";
import { MaintenanceCard } from "@/components/ui/MaintenanceCard";

import { maintenance, getVehicleById } from "@/data";
import type { MaintenanceRecord } from "@/data/types";

const MOCK_TODAY = new Date("2025-01-15T12:00:00Z");

type FilterValue = "all" | "overdue" | "upcoming" | "completed";

const FILTER_OPTIONS = [
  { label: "الكل",     value: "all"       },
  { label: "متأخرة",  value: "overdue"   },
  { label: "قادمة",   value: "upcoming"  },
  { label: "مكتملة",  value: "completed" },
];

function sortRecords(records: MaintenanceRecord[]): MaintenanceRecord[] {
  const ORDER: Record<string, number> = { overdue: 0, upcoming: 1, completed: 2 };
  return [...records].sort((a, b) => {
    const statusDiff = (ORDER[a.status] ?? 3) - (ORDER[b.status] ?? 3);
    if (statusDiff !== 0) return statusDiff;
    // Within same status: overdue/upcoming → ascending due date; completed → descending
    if (a.status === "completed") {
      return new Date(b.completedDate ?? b.dueDate).getTime() -
             new Date(a.completedDate ?? a.dueDate).getTime();
    }
    return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
  });
}

export default function MaintenancePage() {
  const [, setLocation] = useLocation();

  // Local state — initialised from module array so mutations persist within session
  const [records, setRecords] = useState<MaintenanceRecord[]>(() => [...maintenance]);
  const [filter, setFilter] = useState<FilterValue>("all");
  const [search, setSearch] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState("");

  // ── Derived list ──────────────────────────────────────────────────────────
  const filtered = sortRecords(
    records.filter((r) => {
      if (filter !== "all" && r.status !== filter) return false;
      if (!search.trim()) return true;
      const q = search.trim().toLowerCase();
      const v = getVehicleById(r.vehicleId);
      const vehicleStr = v ? `${v.make} ${v.model} ${v.plate}`.toLowerCase() : "";
      const typeLabels: Record<string, string> = {
        oil: "تغيير زيت",
        inspection: "فحص ميكانيكي",
        insurance: "تأمين",
        registration: "تسجيل",
        repair: "تصليح",
      };
      return vehicleStr.includes(q) || typeLabels[r.type]?.includes(q);
    })
  );

  // ── Counts for badge context ───────────────────────────────────────────────
  const overdueCount  = records.filter((r) => r.status === "overdue").length;
  const upcomingCount = records.filter((r) => r.status === "upcoming").length;

  // ── Mark complete ─────────────────────────────────────────────────────────
  function handleMarkComplete(id: string) {
    const updated: MaintenanceRecord = {
      ...records.find((r) => r.id === id)!,
      status: "completed",
      completedDate: MOCK_TODAY.toISOString(),
    };
    // Update local state
    setRecords((prev) => prev.map((r) => (r.id === id ? updated : r)));
    // Mutate module array
    const idx = maintenance.findIndex((r) => r.id === id);
    if (idx !== -1) maintenance[idx] = updated;

    setExpandedId(null);
    setSuccessMsg("تم تسجيل الإنجاز");
    setTimeout(() => setSuccessMsg(""), 2500);
  }

  // ── Toggle expand ─────────────────────────────────────────────────────────
  function handleToggle(id: string) {
    setExpandedId((prev) => (prev === id ? null : id));
  }

  return (
    <div className="min-h-full">
      <PageHeader
        title="الصيانة"
        action={
          <button
            onClick={() => setLocation("/maintenance/add")}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm active:scale-95 transition-transform"
          >
            <Plus className="w-5 h-5" strokeWidth={2.5} />
          </button>
        }
      />

      <div className="px-4 pt-4 pb-2 space-y-3">
        {/* Alert strip — overdue items */}
        {overdueCount > 0 && (
          <div className="flex items-center justify-between px-4 py-2.5 rounded-xl bg-[hsl(var(--status-danger-bg))] border border-[hsl(var(--status-danger))]/20">
            <button
              onClick={() => setFilter("overdue")}
              className="text-xs font-bold text-[hsl(var(--status-danger))] underline"
            >
              عرض المتأخرة
            </button>
            <span className="text-sm font-bold text-[hsl(var(--status-danger))]">
              {overdueCount} {overdueCount === 1 ? "سيارة متأخرة" : "سيارات متأخرة"}
            </span>
          </div>
        )}

        <FilterChips
          options={FILTER_OPTIONS}
          value={filter}
          onChange={(v) => setFilter(v as FilterValue)}
        />

        <SearchBar
          placeholder="ابحث بالسيارة أو نوع الصيانة..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Success toast */}
      {successMsg && (
        <div className="mx-4 mt-1 px-4 py-2.5 rounded-xl bg-[hsl(var(--status-available-bg))] text-[hsl(var(--status-available))] text-sm font-semibold text-right">
          ✓ {successMsg}
        </div>
      )}

      <div className="px-4 pb-4 mt-3 space-y-3">
        {filtered.length === 0 ? (
          <EmptyState
            icon={Wrench}
            title={
              filter === "overdue"
                ? "لا توجد صيانة متأخرة"
                : filter === "upcoming"
                ? "لا توجد صيانة قادمة"
                : filter === "completed"
                ? "لم يتم تسجيل أي صيانة مكتملة بعد"
                : "لا توجد سجلات صيانة"
            }
            description={
              filter === "overdue" || filter === "upcoming"
                ? undefined
                : "اضغط + لتسجيل صيانة جديدة"
            }
            action={
              filter === "all" || filter === "upcoming"
                ? {
                    label: "تسجيل صيانة",
                    onClick: () => setLocation("/maintenance/add"),
                  }
                : filter === "overdue"
                ? undefined
                : undefined
            }
          />
        ) : (
          filtered.map((record) => {
            const vehicle = getVehicleById(record.vehicleId);
            return (
              <MaintenanceCard
                key={record.id}
                record={record}
                vehicleName={vehicle ? `${vehicle.make} ${vehicle.model}` : "—"}
                vehiclePlate={vehicle?.plate ?? ""}
                isExpanded={expandedId === record.id}
                onToggle={() => handleToggle(record.id)}
                onMarkComplete={() => handleMarkComplete(record.id)}
              />
            );
          })
        )}
      </div>
    </div>
  );
}
