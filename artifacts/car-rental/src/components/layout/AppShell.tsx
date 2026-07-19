import { ReactNode } from "react";
import { BottomNavigation } from "./BottomNavigation";

interface AppShellProps {
  children: ReactNode;
  showBottomNav?: boolean;
}

export function AppShell({ children, showBottomNav = true }: AppShellProps) {
  return (
    <div className="max-w-[480px] mx-auto h-[100dvh] flex flex-col bg-background relative overflow-hidden shadow-2xl">
      <main className="flex-1 overflow-y-auto pb-20 no-scrollbar">
        {children}
      </main>
      {showBottomNav && <BottomNavigation />}
    </div>
  );
}
