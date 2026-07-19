import { Search } from "lucide-react";
import { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface SearchBarProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export function SearchBar({ className, ...props }: SearchBarProps) {
  return (
    <div className={cn("relative w-full", className)}>
      <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
        <Search className="w-5 h-5 text-muted-foreground" />
      </div>
      <input
        type="search"
        className="w-full bg-muted text-foreground placeholder:text-muted-foreground rounded-xl py-2.5 pl-4 pr-11 border-none focus:ring-2 focus:ring-primary/20 outline-none text-sm transition-all"
        {...props}
      />
    </div>
  );
}
