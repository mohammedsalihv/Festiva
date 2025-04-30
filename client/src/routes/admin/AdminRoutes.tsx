import React from "react";
import { Routes, Route } from "react-router-dom";

import AdminLogin from "@/pages/admin/auth/AdminLogin";
import NotFound from "@/components/NotFound";




const AdminRoutes: React.FC = () => {
    return (
      <Routes>
        <Route path="login" element={<AdminLogin />} />
        
        {/* Catch-all route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    );
  };
  
  export default AdminRoutes;