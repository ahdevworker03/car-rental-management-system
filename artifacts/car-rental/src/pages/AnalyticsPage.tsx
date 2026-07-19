import { useLocation } from "wouter";
import { TrendingUp, TrendingDown, AlertCircle, CheckCircle2, Users } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { formatLBP } from "@/lib/format";
import { vehicles, rentals, customers, getVehicleById, getCustomerById } from "@/data";

// ─── Mock date anchor ─────────────────────────────────────────────────────────
const MOCK_MONTH = 0;   // January
const MOCK_YEAR  = 2025;
const PREV_MONTH = 11;  // December
const PREV_YEAR  = 2024;

// ─── Helpers ──────────────────────────────────────────────────────────────────
function isInMonth(dateStr: string, month: number, year: number): boolean {
  const d = new Date(dateStr);
  return d.getMonth() === month && d.getFullYear() === year;
}

// ─── Derived data ─────────────────────────────────────────────────────────────

let thisMonthRevenue = 0;
let prevMonthRevenue = 0;
const vehicleRevenueThisMonth: Record<string, number> = {};

rentals.forEach((r) => {
  r.payments.forEach((p) => {
    if (isInMonth(p.date, MOCK_MONTH, MOCK_YEAR)) {
      thisMonthRevenue += p.amount;
      const share = p.amount / r.vehicleIds.length;
      r.vehicleIds.forEach((vid) => {
        vehicleRevenueThisMonth[vid] = (vehicleRevenueThisMonth[vid] ?? 0) + share;
      });
    }
    if (isInMonth(p.date, PREV_MONTH, PREV_YEAR)) {
      prevMonthRevenue += p.amount;
    }
  });
});

const revenueChange =
  prevMonthRevenue > 0
    ? Math.round(((thisMonthRevenue - prevMonthRevenue) / prevMonthRevenue) * 100)
    : null;
const revenueUp = revenueChange !== null && revenueChange >= 0;

let totalPending = 0;
const activeRentals = rentals.filter((r) => r.status === "active");
activeRentals.forEach((r) => {
  const paid = r.payments.reduce((s, p) => s + p.amount, 0);
  totalPending += Math.max(0, r.totalAmount - paid);
});

const vehicleRevenueList = Object.entries(vehicleRevenueThisMonth)
  .map(([vid, amount]) => ({ vehicle: getVehicleById(vid)!, amount }))
  .filter((x) => x.vehicle && x.amount > 0)
  .sort((a, b) => b.amount - a.amount);

const maxVehicleRevenue = vehicleRevenueList[0]?.amount ?? 1;

const availableCount   = vehicles.filter((v) => v.status === "available").length;
const rentedCount      = vehicles.filter((v) => v.status === "rented").length;
const maintenanceCount = vehicles.filter((v) => v.status === "maintenance").length;

const rentedVehicles      = vehicles.filter((v) => v.status === "rented");
const maintenanceVehicles = vehicles.filter((v) => v.status === "maintenance");

const endedCount = rentals.filter((r) => r.status === "ended").length;

const customerBalance: Record<string, number> = {};
activeRentals.forEach((r) => {
  const paid = r.payments.reduce((s, p) => s + p.amount, 0);
  const remaining = Math.max(0, r.totalAmount - paid);
  if (remaining > 0) {
    customerBalance[r.customerId] = (customerBalance[r.customerId] ?? 0) + remaining;
  }
});
const topDebtorEntry = Object.entries(customerBalance).sort((a, b) => b[1] - a[1])[0];
const topDebtor = topDebtorEntry
  ? { customer: getCustomerById(topDebtorEntry[0])!, balance: topDebtorEntry[1] }
  : null;

// ─── Component ────────────────────────────────────────────────────────────────
export default function AnalyticsPage() {
  const [, navigate] = useLocation();

  return (
    <div className="min-h-full">
      <PageHeader title="التحليلات" showBack />

      <div className="px-4 pt-4 pb-8 space-y-6">

        {/* ── Section 1: Revenue ─────────────────────────────────────────── */}
        <section>
          <SectionHeader title="الإيرادات" />

          {/* Main revenue card */}
          <div className="rounded-2xl bg-primary p-5 text-white mb-3">
            <p className="text-sm font-medium opacity-80 mb-1">إيرادات يناير ٢٠٢٥</p>
            <p className="text-3xl font-bold tracking-tight">{formatLBP(thisMonthRevenue)}</p>

            {revenueChange !== null && (
              <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-white/20">
                {revenueUp
                  ? <TrendingUp size={15} className="shrink-0 opacity-90" />
                  : <TrendingDown size={15} className="shrink-0 opacity-90" />}
                <span className="text-sm opacity-90">
                  {revenueUp ? "+" : ""}{revenueChange}٪ مقارنةً بالشهر الماضي
                  {" "}({formatLBP(prevMonthRevenue)})
                </span>
              </div>
            )}
          </div>

          {/* Pending balance warning */}
          <div className="rounded-xl border border-[hsl(var(--status-danger-bg))] bg-[hsl(var(--status-danger-bg))] px-4 py-3 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-[hsl(var(--status-danger))]">
              <AlertCircle size={16} className="shrink-0" />
              <span className="text-sm font-medium">مبالغ غير محصّلة</span>
            </div>
            <span className="text-sm font-bold text-[hsl(var(--status-danger))]">
              {formatLBP(totalPending)}
            </span>
          </div>
        </section>

        {/* ── Section 2: Revenue by vehicle ─────────────────────────────── */}
        <section>
          <SectionHeader title="إيرادات السيارات هذا الشهر" />

          {vehicleRevenueList.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">
              لا توجد إيرادات هذا الشهر
            </p>
          ) : (
            <div className="rounded-2xl border border-border bg-card divide-y divide-border overflow-hidden">
              {vehicleRevenueList.map((item, idx) => {
                const pct = Math.round((item.amount / maxVehicleRevenue) * 100);
                const isTop = idx === 0;
                return (
                  <button
                    key={item.vehicle.id}
                    onClick={() => navigate(`/vehicles/${item.vehicle.id}`)}
                    className="w-full text-right px-4 py-3 hover:bg-muted/40 active:bg-muted transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-bold text-foreground tabular-nums">
                        {formatLBP(item.amount)}
                      </span>
                      <div className="flex items-center gap-1.5">
                        {isTop && (
                          <span className="text-[10px] font-bold bg-primary/10 text-primary px-1.5 py-0.5 rounded-full leading-none">
                            الأعلى
                          </span>
                        )}
                        <span className="text-sm font-medium text-foreground">
                          {item.vehicle.make} {item.vehicle.model}
                        </span>
                      </div>
                    </div>
                    <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${isTop ? "bg-primary" : "bg-primary/40"}`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </section>

        {/* ── Section 3: Fleet status ────────────────────────────────────── */}
        <section>
          <SectionHeader title="حالة الأسطول" />

          <div className="grid grid-cols-3 gap-2 mb-4">
            <div className="rounded-xl bg-[hsl(var(--status-available-bg))] text-[hsl(var(--status-available))] p-3 text-center">
              <p className="text-2xl font-bold">{availableCount}</p>
              <p className="text-xs font-medium mt-0.5">متاحة</p>
            </div>
            <div className="rounded-xl bg-[hsl(var(--status-rented-bg))] text-[hsl(var(--status-rented))] p-3 text-center">
              <p className="text-2xl font-bold">{rentedCount}</p>
              <p className="text-xs font-medium mt-0.5">مؤجرة</p>
            </div>
            <div className="rounded-xl bg-[hsl(var(--status-maintenance-bg))] text-[hsl(var(--status-maintenance))] p-3 text-center">
              <p className="text-2xl font-bold">{maintenanceCount}</p>
              <p className="text-xs font-medium mt-0.5">صيانة</p>
            </div>
          </div>

          {/* Currently rented */}
          {rentedVehicles.length > 0 && (
            <div className="mb-3">
              <p className="text-xs font-semibold text-muted-foreground mb-2">
                المؤجرة الآن
              </p>
              <div className="rounded-2xl border border-border bg-card divide-y divide-border overflow-hidden">
                {rentedVehicles.map((v) => {
                  const rental = activeRentals.find((r) => r.vehicleIds.includes(v.id));
                  const customer = rental ? getCustomerById(rental.customerId) : null;
                  return (
                    <button
                      key={v.id}
                      onClick={() => navigate(`/vehicles/${v.id}`)}
                      className="w-full text-right px-4 py-3 flex items-center justify-between hover:bg-muted/40 active:bg-muted transition-colors"
                    >
                      <StatusBadge status="rented" />
                      <div>
                        <p className="text-sm font-semibold text-foreground">
                          {v.make} {v.model}
                        </p>
                        {customer && (
                          <p className="text-xs text-muted-foreground">{customer.name}</p>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Currently under maintenance */}
          {maintenanceVehicles.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-muted-foreground mb-2">
                قيد الصيانة الآن
              </p>
              <div className="rounded-2xl border border-border bg-card divide-y divide-border overflow-hidden">
                {maintenanceVehicles.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => navigate(`/vehicles/${v.id}`)}
                    className="w-full text-right px-4 py-3 flex items-center justify-between hover:bg-muted/40 active:bg-muted transition-colors"
                  >
                    <StatusBadge status="maintenance" />
                    <p className="text-sm font-semibold text-foreground">
                      {v.make} {v.model}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* ── Section 4: Quick stats ─────────────────────────────────────── */}
        <section>
          <SectionHeader title="ملخص عام" />
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl border border-border bg-card p-4 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[hsl(var(--status-available-bg))] flex items-center justify-center shrink-0">
                <CheckCircle2 size={18} className="text-[hsl(var(--status-available))]" />
              </div>
              <div>
                <p className="text-xl font-bold text-foreground leading-tight">{endedCount}</p>
                <p className="text-xs text-muted-foreground">إيجار مكتمل</p>
              </div>
            </div>
            <div className="rounded-2xl border border-border bg-card p-4 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <Users size={18} className="text-primary" />
              </div>
              <div>
                <p className="text-xl font-bold text-foreground leading-tight">{customers.length}</p>
                <p className="text-xs text-muted-foreground">عميل مسجّل</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Section 5: Top debtor ──────────────────────────────────────── */}
        {topDebtor && (
          <section>
            <SectionHeader title="العميل ذو الرصيد الأعلى" />
            <button
              onClick={() => navigate(`/customers/${topDebtor.customer.id}`)}
              className="w-full text-right rounded-2xl border border-[hsl(var(--status-danger-bg))] bg-card p-4 hover:bg-muted/40 active:bg-muted transition-colors"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="text-left shrink-0">
                  <p className="text-lg font-bold text-[hsl(var(--status-danger))] tabular-nums leading-tight">
                    {formatLBP(topDebtor.balance)}
                  </p>
                  <p className="text-xs text-muted-foreground">رصيد متبقٍّ</p>
                </div>
                <div className="flex items-center gap-3">
                  <div>
                    <p className="text-sm font-bold text-foreground">{topDebtor.customer.name}</p>
                    <p className="text-xs text-muted-foreground">{topDebtor.customer.location}</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-[hsl(var(--status-danger-bg))] flex items-center justify-center shrink-0">
                    <span className="text-sm font-bold text-[hsl(var(--status-danger))]">
                      {topDebtor.customer.name.charAt(0)}
                    </span>
                  </div>
                </div>
              </div>
            </button>
          </section>
        )}

      </div>
    </div>
  );
}
