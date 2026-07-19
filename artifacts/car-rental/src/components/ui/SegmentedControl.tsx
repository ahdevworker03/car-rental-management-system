import { cn } from "@/lib/utils";

interface SegmentedControlProps {
  options: { label: string; value: string }[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function SegmentedControl({ options, value, onChange, className }: SegmentedControlProps) {
  return (
    <div className={cn("flex w-full bg-muted p-1 rounded-xl", className)}>
      {options.map((option) => {
        const isActive = value === option.value;
        return (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            className={cn(
              "flex-1 py-2 px-3 text-sm font-medium rounded-lg transition-all duration-200",
              isActive 
                ? "bg-white text-foreground shadow-sm" 
                : "text-muted-foreground hover:text-foreground hover:bg-white/50"
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
