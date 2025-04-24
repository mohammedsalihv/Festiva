import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import UserRoutes from "./routes/UserRoutes";
import HostRoutes from "./routes/HostRoutes";
import PublicRoutes from "./routes/PublicRoutes";

import HostLanding from "@/pages/host/landing/HostLanding";
import HostRegister from "./pages/host/Auth/HostRegister";
import HostLogin from "./pages/host/Auth/HostLogin";
import PrivateRoute from "./routes/Protect/PrivateRoute";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes (outside protected RoleBasedRoute) */}
        <Route path="/*" element={<PublicRoutes />} />

        <Route
          path="/host/landing"
          element={
            <PrivateRoute>
              <HostLanding />
            </PrivateRoute>
          }
        />
        <Route
          path="/host/register"
          element={
            <PrivateRoute>
              <HostRegister />
            </PrivateRoute>
          }
        />
        <Route
          path="/host/login"
          element={
            <PrivateRoute>
              <HostLogin />
            </PrivateRoute>
          }
        />

        {/* Protected User Routes */}
        <Route
          path="/user/*"
          element={
            <PrivateRoute allowedRoles={["user"]}>
              <UserRoutes />
            </PrivateRoute>
          }
        />

        {/* Protected Host Routes */}
        <Route
          path="/host/*"
          element={
            <PrivateRoute allowedRoles={["host"]}>
              <HostRoutes />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
