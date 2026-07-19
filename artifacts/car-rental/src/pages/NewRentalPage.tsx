import { PageHeader } from "@/components/layout/PageHeader";

export default function NewRentalPage() {
  return (
    <div className="min-h-full bg-background">
      <PageHeader title="تأجير جديد" showBack />
      <div className="flex items-center justify-center py-24 text-muted-foreground">
        قريباً
      </div>
    </div>
  );
}
