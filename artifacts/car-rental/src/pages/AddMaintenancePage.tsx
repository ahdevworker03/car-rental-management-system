import { PageHeader } from "@/components/layout/PageHeader";

export default function AddMaintenancePage() {
  return (
    <div className="min-h-full bg-background">
      <PageHeader title="تسجيل صيانة" showBack />
      <div className="flex items-center justify-center py-24 text-muted-foreground">
        قريباً
      </div>
    </div>
  );
}
