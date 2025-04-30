import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserRoutes from "./routes/user/UserRoutes";
import HostRoutes from "./routes/host/HostRoutes";
import AdminRoutes from "./routes/admin/AdminRoutes";
import PublicRoutes from "./routes/user/PublicRoutes";
import HostLanding from "@/pages/host/landing/HostLanding";
import HostLogin from "./pages/host/Auth/HostLogin";
import AdminLogin from "@/pages/admin/auth/AdminLogin";
import HostRegister from "./pages/host/Auth/HostRegister";
import HostPrivateRoute from "./routes/host/HostPrivateRoute";
import UserPrivateRoute from "./routes/Protect/UserPrivateRoute";
import SharedAccessRoute from "./routes/Protect/SharedAccessRoute";
import AdminPrivateRoute from "./routes/admin/AdminPrivateRoutes";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/*" element={<PublicRoutes />} />

        {/* Shared Access Routes (for both users and hosts) */}
        <Route
          path="/host/landing"
          element={
            <SharedAccessRoute>
              <HostLanding />
            </SharedAccessRoute>
          }
        />
        <Route path="/host/login" element={<HostLogin />} />
        <Route path="/host/register" element={<HostRegister />} />

        {/* Protected User Routes */}
        <Route
          path="/user/*"
          element={
            <UserPrivateRoute>
              <UserRoutes />
            </UserPrivateRoute>
          }
        />

        {/* Protected Host-only Routes */}
        <Route
          path="/host/*"
          element={
            <HostPrivateRoute>
              <HostRoutes />
            </HostPrivateRoute>
          }
        />
        <Route
          path="/admin/*"
          element={
            <AdminPrivateRoute>
              <AdminRoutes />
            </AdminPrivateRoute>
          }
        />
        <Route path="/admin/login-admin" element={<AdminLogin />} />
      </Routes>
    </Router>
  );
};

export default App;
