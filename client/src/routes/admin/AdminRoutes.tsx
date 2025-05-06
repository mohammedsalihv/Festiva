import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminUsers from "@/pages/admin/AdminUsers";
import AdminHosts from "@/pages/admin/AdminHosts";

const AdminRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="dashboard" element={<AdminDashboard />} />
      <Route path="users" element={<AdminUsers />} />
      <Route path="hosts" element={<AdminHosts />} />
    </Routes>
  );
};

export default AdminRoutes;
