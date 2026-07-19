import { Link, useRoute } from "wouter";
import { Home, Car, Users, FileText, Wrench } from "lucide-react";
import { cn } from "@/lib/utils";

const TABS = [
  { label: "الرئيسية", icon: Home, route: "/" },
  { label: "السيارات", icon: Car, route: "/vehicles" },
  { label: "العملاء", icon: Users, route: "/customers" },
  { label: "الإيجارات", icon: FileText, route: "/rentals" },
  { label: "الصيانة", icon: Wrench, route: "/maintenance" },
];

export function BottomNavigation() {
  return (
    <div className="fixed bottom-0 left-0 right-0 w-full bg-white border-t border-border z-50">
      <div className="max-w-[480px] mx-auto flex justify-between items-center px-2">
        {TABS.map((tab) => {
          const [isActive] = useRoute(tab.route);
          const Icon = tab.icon;
          
          return (
            <Link key={tab.route} href={tab.route} className="flex-1">
              <div className="flex flex-col items-center justify-center py-2 min-h-[56px] gap-1 cursor-pointer">
                <Icon 
                  className={cn("w-6 h-6", isActive ? "text-primary" : "text-muted-foreground")} 
                  strokeWidth={isActive ? 2.5 : 2}
                  style={isActive ? { fill: "currentColor", fillOpacity: 0.1 } : {}}
                />
                <span className={cn("text-[11px] font-medium", isActive ? "text-primary" : "text-muted-foreground")}>
                  {tab.label}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
