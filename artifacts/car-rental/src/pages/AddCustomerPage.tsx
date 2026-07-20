import { useState } from "react";
import { useLocation } from "wouter";

import { PageHeader } from "@/components/layout/PageHeader";
import { FormField, inputClass } from "@/components/ui/FormField";

interface FormState {
  name: string;
  phone: string;
  location: string;
  notes: string;
}

const INITIAL: FormState = {
  name: "",
  phone: "",
  location: "",
  notes: "",
};

export default function AddCustomerPage() {
  const [, setLocation] = useLocation();
  const [form, setForm] = useState<FormState>(INITIAL);
  const [errors, setErrors] = useState<Partial<FormState>>({});

  function set(field: keyof FormState, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  function validate(): boolean {
    const e: Partial<FormState> = {};
    if (!form.name.trim()) e.name = "هذا الحقل مطلوب";
    if (!form.phone.trim()) e.phone = "هذا الحقل مطلوب";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSave() {
    if (!validate()) return;
    // Prototype: no real persistence — navigate back to customers list
    setLocation("/customers");
  }

  const isFormFilled =
    form.name.trim().length > 0 && form.phone.trim().length > 0;

  return (
    <div className="min-h-full pb-8">
      <PageHeader title="إضافة عميل" showBack />

      <div className="px-4 pt-5 space-y-4">

        <FormField label="الاسم الكامل" required error={errors.name}>
          <input
            className={inputClass}
            placeholder="مثال: أحمد محمد"
            value={form.name}
            onChange={(e) => set("name", e.target.value)}
            autoComplete="name"
          />
        </FormField>

        <FormField label="رقم الهاتف" required error={errors.phone}>
          <input
            className={inputClass}
            placeholder="مثال: 03-123456"
            inputMode="tel"
            value={form.phone}
            onChange={(e) => set("phone", e.target.value)}
            autoComplete="tel"
          />
        </FormField>

        <FormField label="الموقع" hint="المنطقة أو المدينة">
          <input
            className={inputClass}
            placeholder="مثال: بيروت"
            value={form.location}
            onChange={(e) => set("location", e.target.value)}
          />
        </FormField>

        <FormField label="ملاحظات">
          <textarea
            className={`${inputClass} min-h-[96px] resize-none`}
            placeholder="أي معلومات إضافية..."
            value={form.notes}
            onChange={(e) => set("notes", e.target.value)}
            rows={3}
          />
        </FormField>

        <button
          onClick={handleSave}
          disabled={!isFormFilled}
          className="w-full bg-primary text-primary-foreground rounded-2xl py-4 font-bold text-base disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.99] transition-all mt-2"
        >
          حفظ العميل
        </button>

      </div>
    </div>
  );
}
