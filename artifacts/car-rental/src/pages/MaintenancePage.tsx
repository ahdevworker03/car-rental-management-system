import { PageHeader } from "@/components/layout/PageHeader";

export default function MaintenancePage() {
  return (
    <div className="min-h-full">
      <PageHeader title="الصيانة" />
      <div className="flex items-center justify-center py-24 text-muted-foreground">
        قريباً
      </div>
    </div>
  );
}
