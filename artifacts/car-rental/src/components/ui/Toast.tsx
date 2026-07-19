import { toast as sonnerToast } from "sonner";
export { Toaster } from "@/components/ui/toaster";

export function showToast(message: string, type: "success" | "error" = "success") {
  if (type === "error") {
    sonnerToast.error(message, {
      position: "top-center"
    });
  } else {
    sonnerToast.success(message, {
      position: "top-center"
    });
  }
}
