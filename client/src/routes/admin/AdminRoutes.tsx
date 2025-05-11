import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminUsers from "@/pages/admin/AdminUsers";
import AdminHosts from "@/pages/admin/AdminHosts";
import LoaderPage from "@/reusable-components/Messages/LoaderPage";

const AdminRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="dashboard" element={<AdminDashboard />} />
      <Route path="users" element={<AdminUsers />} />
      <Route
        path="hosts"
        element={
          <LoaderPage>
            <AdminHosts />
          </LoaderPage>
        }
      />
    </Routes>
  );
};

export default AdminRoutes;
