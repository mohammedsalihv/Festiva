import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminDashboard from "@/pages/admin/service/AdminDashboard";

const AdminRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="dashboard" element={<AdminDashboard />} />
    </Routes>
  );
};

export default AdminRoutes;
