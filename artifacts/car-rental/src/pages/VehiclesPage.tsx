import { PageHeader } from "@/components/layout/PageHeader";

export default function VehiclesPage() {
  return (
    <div className="min-h-full">
      <PageHeader title="السيارات" />
      <div className="flex items-center justify-center py-24 text-muted-foreground">
        قريباً
      </div>
    </div>
  );
}
