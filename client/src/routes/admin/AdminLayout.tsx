import { ReactNode } from "react";
import AdminSidebar from "@/reusable-components/admin/AdminSidebar";
import AdminHeader from "@/reusable-components/admin/AdminHeader";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="flex min-h-screen bg-white font-sans">
      <AdminSidebar />
      <div className="flex-1 flex flex-col p-4">
        <AdminHeader />
        <div className="flex-1 overflow-x-hidden">
          {children}
        </div>
      </div>
    </div>
  );
}