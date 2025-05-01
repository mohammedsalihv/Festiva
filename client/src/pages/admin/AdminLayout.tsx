import { ReactNode } from "react";
import AdminSidebar from "@/reusable-components/admin/AdminSidebar";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="flex min-h-screen">
      <div className="hidden md:block w-16 bg-gray-200 text-white p-4">
         <AdminSidebar/>
      </div>
      <div className="flex-1 p-4 bg-gray-200">
        {children}
      </div>
    </div>
  );
}
