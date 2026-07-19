import { cn } from "@/lib/utils";

type StatusType = "available" | "rented" | "maintenance" | "completed" | "upcoming" | "overdue";

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
}

const statusMap: Record<StatusType, { label: string; bgClass: string; textClass: string }> = {
  available: { label: "متاحة", bgClass: "bg-[hsl(var(--status-available-bg))]", textClass: "text-[hsl(var(--status-available))]" },
  rented: { label: "مؤجرة", bgClass: "bg-[hsl(var(--status-rented-bg))]", textClass: "text-[hsl(var(--status-rented))]" },
  maintenance: { label: "صيانة", bgClass: "bg-[hsl(var(--status-maintenance-bg))]", textClass: "text-[hsl(var(--status-maintenance))]" },
  completed: { label: "مكتملة", bgClass: "bg-[hsl(var(--status-available-bg))]", textClass: "text-[hsl(var(--status-available))]" },
  upcoming: { label: "قادمة", bgClass: "bg-[hsl(var(--status-rented-bg))]", textClass: "text-[hsl(var(--status-rented))]" },
  overdue: { label: "متأخرة", bgClass: "bg-[hsl(var(--status-danger-bg))]", textClass: "text-[hsl(var(--status-danger))]" },
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusMap[status];
  
  if (!config) return null;

  return (
    <span 
      className={cn(
        "inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-xs font-semibold whitespace-nowrap",
        config.bgClass,
        config.textClass,
        className
      )}
    >
      {config.label}
    </span>
  );
}
