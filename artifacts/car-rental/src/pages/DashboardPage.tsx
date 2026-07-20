import { useLocation } from "wouter";
import {
  Car,
  Wrench,
  Plus,
  ChevronLeft,
  AlertTriangle,
  Clock,
  TrendingUp,
  RotateCcw,
  CheckCircle2,
} from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { StatCard } from "@/components/ui/StatCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { EmptyState } from "@/components/ui/EmptyState";
import { MAINTENANCE_TYPES } from "@/components/ui/MaintenanceCard";
import { formatLBP, formatDateShort } from "@/lib/format";
import { cn } from "@/lib/utils";
import {
  vehicles,
  rentals,
  maintenance,
  getVehicleById,
  getCustomerById,
} from "@/data";
import type { MaintenanceType } from "@/data/types";

// ─── Mock date anchor ──────────────────────────────────────────────────────────
const MOCK_TODAY = new Date("2025-01-15T12:00:00Z");
const MOCK_MONTH = 0; // January
const MOCK_YEAR = 2025;

// ─── Helpers ───────────────────────────────────────────────────────────────────
function daysFromToday(dateStr: string): number {
  const diff = new Date(dateStr).getTime() - MOCK_TODAY.getTime();
  return Math.ceil(diff / 86_400_000);
}

function dueLabelFor(days: number): { text: string; urgent: boolean } {
  if (days < 0) return { text: `متأخر ${Math.abs(days)} يوم`, urgent: true };
  if (days === 0) return { text: "اليوم", urgent: true };
  if (days === 1) return { text: "غداً", urgent: true };
  return { text: `بعد ${days} أيام`, urgent: false };
}

// ─── Derived data ──────────────────────────────────────────────────────────────
const availableCount = vehicles.filter((v) => v.status === "available").length;
const rentedCount = vehicles.filter((v) => v.status === "rented").length;
const maintenanceCount = vehicles.filter((v) => v.status === "maintenance").length;

const endingSoonRentals = rentals
  .filter((r) => r.status === "active")
  .filter((r) => {
    const days = daysFromToday(r.endDate);
    return days >= 0 && days <= 2;
  })
  .sort((a, b) => new Date(a.endDate).getTime() - new Date(b.endDate).getTime());

const overdueItems = maintenance.filter((m) => m.status === "overdue");

const upcomingMaintenance = maintenance
  .filter((m) => m.status === "upcoming")
  .filter((m) => daysFromToday(m.dueDate) <= 7)
  .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());

const monthlyRevenue = rentals.reduce((sum, r) => {
  return (
    sum +
    r.payments.reduce((s, p) => {
      const d = new Date(p.date);
      return d.getMonth() === MOCK_MONTH && d.getFullYear() === MOCK_YEAR
        ? s + p.amount
        : s;
    }, 0)
  );
}, 0);

const pendingBalance = rentals
  .filter((r) => r.status === "active")
  .reduce((sum, r) => {
    const paid = r.payments.reduce((s, p) => s + p.amount, 0);
    return sum + Math.max(0, r.totalAmount - paid);
  }, 0);

const recentActivity = rentals
  .filter((r) => r.status === "ended" && r.returnDate)
  .sort(
    (a, b) =>
      new Date(b.returnDate!).getTime() - new Date(a.returnDate!).getTime()
  )
  .slice(0, 4);

const hasTasks =
  endingSoonRentals.length > 0 || overdueItems.length > 0;

// ─── Local sub-components ──────────────────────────────────────────────────────

function TaskCard({
  children,
  onClick,
  urgent,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  urgent?: boolean;
}) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "bg-card rounded-xl p-4 border shadow-sm flex items-start gap-3",
        urgent ? "border-[hsl(var(--status-danger-bg))]" : "border-card-border",
        onClick && "cursor-pointer active:scale-[0.99] transition-transform"
      )}
    >
      {children}
    </div>
  );
}

function QuickActionButton({
  icon: Icon,
  label,
  onClick,
  primary,
}: {
  icon: React.ElementType;
  label: string;
  onClick: () => void;
  primary?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex flex-col items-center justify-center gap-2 rounded-2xl p-4 min-h-[88px] w-full transition-transform active:scale-95",
        primary
          ? "bg-primary text-primary-foreground shadow-sm"
          : "bg-card border border-card-border text-foreground shadow-sm"
      )}
    >
      <Icon className="w-6 h-6" strokeWidth={1.75} />
      <span className="text-sm font-semibold leading-tight text-center">
        {label}
      </span>
    </button>
  );
}

function RevenueCard({ onClick }: { onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      className="bg-primary rounded-2xl p-5 cursor-pointer active:scale-[0.99] transition-transform shadow-sm"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-primary-foreground/80">
          <TrendingUp className="w-4 h-4" strokeWidth={2} />
          <span className="text-sm font-medium">دخل يناير ٢٠٢٥</span>
        </div>
        <ChevronLeft className="w-4 h-4 text-primary-foreground/60" strokeWidth={2} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="text-2xl font-bold text-primary-foreground leading-tight">
            {formatLBP(monthlyRevenue)}
          </div>
          <div className="text-xs text-primary-foreground/70 mt-1 font-medium">
            إجمالي الدخل
          </div>
        </div>
        <div className="border-r border-primary-foreground/20 pr-4">
          <div className="text-2xl font-bold text-primary-foreground/90 leading-tight">
            {formatLBP(pendingBalance)}
          </div>
          <div className="text-xs text-primary-foreground/70 mt-1 font-medium">
            رصيد متبقي
          </div>
        </div>
      </div>
    </div>
  );
}

function ActivityRow({ rentalId }: { rentalId: string }) {
  const rental = rentals.find((r) => r.id === rentalId);
  if (!rental) return null;
  const vehicle = getVehicleById(rental.vehicleIds[0]);
  const customer = getCustomerById(rental.customerId);
  if (!vehicle || !customer) return null;

  return (
    <div className="flex items-center gap-3 py-3 border-b border-border last:border-0">
      <div className="w-9 h-9 rounded-full bg-[hsl(var(--status-available-bg))] flex items-center justify-center flex-shrink-0">
        <CheckCircle2
          className="w-5 h-5 text-[hsl(var(--status-available))]"
          strokeWidth={1.75}
        />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-semibold text-foreground truncate">
          {vehicle.make} {vehicle.model}
        </div>
        <div className="text-xs text-muted-foreground truncate">
          {customer.name} · {formatDateShort(rental.returnDate!)}
        </div>
      </div>
      <div className="text-sm font-bold text-foreground flex-shrink-0">
        {formatLBP(rental.totalAmount)}
      </div>
    </div>
  );
}

// ─── Main component ────────────────────────────────────────────────────────────

export default function DashboardPage() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-full">
      <PageHeader title="الرئيسية" />

      <div className="px-4 py-5 space-y-6">

        {/* ── Fleet Status ──────────────────────────────────────────────── */}
        <section>
          <SectionHeader
            title="حالة الأسطول"
            action={
              <button onClick={() => setLocation("/vehicles")} className="flex items-center gap-1">
                عرض الكل
                <ChevronLeft className="w-3.5 h-3.5" strokeWidth={2.5} />
              </button>
            }
          />
          <div className="grid grid-cols-3 gap-3">
            <StatCard
              label="متاحة"
              value={availableCount}
              variant="available"
              onClick={() => setLocation("/vehicles")}
            />
            <StatCard
              label="مؤجرة"
              value={rentedCount}
              variant="rented"
              onClick={() => setLocation("/rentals")}
            />
            <StatCard
              label="صيانة"
              value={maintenanceCount}
              variant="maintenance"
              onClick={() => setLocation("/maintenance")}
            />
          </div>
        </section>

        {/* ── Revenue ───────────────────────────────────────────────────── */}
        <section>
          <RevenueCard onClick={() => setLocation("/analytics")} />
        </section>

        {/* ── Quick Actions ─────────────────────────────────────────────── */}
        <section>
          <SectionHeader title="إجراءات سريعة" />
          <div className="grid grid-cols-2 gap-3">
            <QuickActionButton
              icon={Car}
              label="تأجير سيارة"
              onClick={() => setLocation("/rentals/new")}
              primary
            />
            <QuickActionButton
              icon={RotateCcw}
              label="إعادة سيارة"
              onClick={() => setLocation("/rentals")}
            />
            <QuickActionButton
              icon={Plus}
              label="إضافة سيارة"
              onClick={() => setLocation("/vehicles/add")}
            />
            <QuickActionButton
              icon={Wrench}
              label="تسجيل صيانة"
              onClick={() => setLocation("/maintenance/add")}
            />
          </div>
        </section>

        {/* ── Today's Tasks ─────────────────────────────────────────────── */}
        <section>
          <SectionHeader title="مهام اليوم" />
          {!hasTasks ? (
            <EmptyState
              icon={CheckCircle2}
              title="لا توجد مهام اليوم"
              description="لا توجد إيجارات منتهية أو صيانة متأخرة"
              className="py-8"
            />
          ) : (
            <div className="space-y-2">
              {/* Rentals ending soon */}
              {endingSoonRentals.map((rental) => {
                const vehicle = getVehicleById(rental.vehicleIds[0]);
                const customer = getCustomerById(rental.customerId);
                const days = daysFromToday(rental.endDate);
                const due = dueLabelFor(days);
                if (!vehicle || !customer) return null;

                return (
                  <TaskCard
                    key={rental.id}
                    urgent={due.urgent}
                    onClick={() => setLocation(`/rentals/${rental.id}`)}
                  >
                    <div
                      className={cn(
                        "w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5",
                        due.urgent
                          ? "bg-[hsl(var(--status-danger-bg))]"
                          : "bg-[hsl(var(--status-rented-bg))]"
                      )}
                    >
                      <Clock
                        className={cn(
                          "w-5 h-5",
                          due.urgent
                            ? "text-[hsl(var(--status-danger))]"
                            : "text-[hsl(var(--status-rented))]"
                        )}
                        strokeWidth={1.75}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-0.5">
                        <span className="text-sm font-bold text-foreground">
                          {vehicle.make} {vehicle.model}
                        </span>
                        <span
                          className={cn(
                            "text-xs font-semibold px-2 py-0.5 rounded-full",
                            due.urgent
                              ? "bg-[hsl(var(--status-danger-bg))] text-[hsl(var(--status-danger))]"
                              : "bg-[hsl(var(--status-rented-bg))] text-[hsl(var(--status-rented))]"
                          )}
                        >
                          {due.text}
                        </span>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {customer.name} · {vehicle.plate}
                      </div>
                    </div>
                  </TaskCard>
                );
              })}

              {/* Overdue maintenance */}
              {overdueItems.map((item) => {
                const vehicle = getVehicleById(item.vehicleId);
                if (!vehicle) return null;
                const days = daysFromToday(item.dueDate);
                const due = dueLabelFor(days);

                return (
                  <TaskCard
                    key={item.id}
                    urgent
                    onClick={() => setLocation("/maintenance")}
                  >
                    <div className="w-9 h-9 rounded-full bg-[hsl(var(--status-danger-bg))] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <AlertTriangle
                        className="w-5 h-5 text-[hsl(var(--status-danger))]"
                        strokeWidth={1.75}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-0.5">
                        <span className="text-sm font-bold text-foreground">
                          {MAINTENANCE_TYPES[item.type as MaintenanceType]?.label ?? item.type}
                        </span>
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[hsl(var(--status-danger-bg))] text-[hsl(var(--status-danger))]">
                          {due.text}
                        </span>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {vehicle.make} {vehicle.model} · {vehicle.plate}
                      </div>
                    </div>
                  </TaskCard>
                );
              })}
            </div>
          )}
        </section>

        {/* ── Upcoming Maintenance ──────────────────────────────────────── */}
        {upcomingMaintenance.length > 0 && (
          <section>
            <SectionHeader
              title="الصيانة القادمة"
              action={
                <button onClick={() => setLocation("/maintenance")} className="flex items-center gap-1">
                  عرض الكل
                  <ChevronLeft className="w-3.5 h-3.5" strokeWidth={2.5} />
                </button>
              }
            />
            <div className="space-y-2">
              {upcomingMaintenance.map((item) => {
                const vehicle = getVehicleById(item.vehicleId);
                if (!vehicle) return null;
                const days = daysFromToday(item.dueDate);
                const due = dueLabelFor(days);

                return (
                  <TaskCard
                    key={item.id}
                    onClick={() => setLocation("/maintenance")}
                  >
                    <div className="w-9 h-9 rounded-full bg-[hsl(var(--status-maintenance-bg))] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Wrench
                        className="w-5 h-5 text-[hsl(var(--status-maintenance))]"
                        strokeWidth={1.75}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-0.5">
                        <span className="text-sm font-bold text-foreground">
                          {MAINTENANCE_TYPES[item.type as MaintenanceType]?.label ?? item.type}
                        </span>
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[hsl(var(--status-maintenance-bg))] text-[hsl(var(--status-maintenance))]">
                          {due.text}
                        </span>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {vehicle.make} {vehicle.model} · {formatDateShort(item.dueDate)}
                      </div>
                    </div>
                  </TaskCard>
                );
              })}
            </div>
          </section>
        )}

        {/* ── Recent Activity ───────────────────────────────────────────── */}
        {recentActivity.length > 0 && (
          <section>
            <SectionHeader
              title="النشاط الأخير"
              action={
                <button onClick={() => setLocation("/rentals")} className="flex items-center gap-1">
                  عرض الكل
                  <ChevronLeft className="w-3.5 h-3.5" strokeWidth={2.5} />
                </button>
              }
            />
            <div className="bg-card rounded-xl border border-card-border shadow-sm px-4">
              {recentActivity.map((rental) => (
                <ActivityRow key={rental.id} rentalId={rental.id} />
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  );
}
