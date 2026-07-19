import { PageHeader } from "@/components/layout/PageHeader";

export default function RentalsPage() {
  return (
    <div className="min-h-full">
      <PageHeader title="الإيجارات" />
      <div className="flex items-center justify-center py-24 text-muted-foreground">
        قريباً
      </div>
    </div>
  );
}
