import { PageHeader } from "@/components/layout/PageHeader";

export default function VehicleDetailPage() {
  return (
    <div className="min-h-full">
      <PageHeader title="تفاصيل السيارة" showBack />
      <div className="flex items-center justify-center py-24 text-muted-foreground">
        قريباً
      </div>
    </div>
  );
}
