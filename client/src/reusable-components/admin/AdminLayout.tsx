import { ReactNode } from "react";
import AdminSidebar from "@/reusable-components/admin/AdminSidebar";
import AdminHeader from "@/reusable-components/admin/AdminHeader";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="flex min-h-screen overflow-x-hidden bg-gray-100">
      <div className="hidden md:block w-16 bg-gray-100 text-white p-4">
        <AdminSidebar />
      </div>
      <div className="flex-1 flex flex-col p-4 overflow-x-hidden">
        <div className="w-full overflow-x-hidden">
          <AdminHeader role="Project Manager" />
        </div>
        <div className="flex-1 overflow-x-hidden">
          {children}
        </div>
      </div>
    </div>
  );
}

