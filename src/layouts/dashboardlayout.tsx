
import type { ReactNode } from "react";
import Sidebar from "../components/sidebar";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  return (
    <div className="app-layout">
      <Sidebar />
      {children}
    </div>
  );
}
