import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import UserRoutes from "./routes/UserRoutes";
import HostRoutes from "./routes/HostRoutes";
import RoleBasedRoute from "./routes/Protect/RoleBasedRoute";
import PublicRoutes from "./routes/PublicRoutes";
import { Roles } from "./utils/constants/roles";
import HostLanding from "@/pages/host/HostLanding";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes (outside protected RoleBasedRoute) */}
        <Route path="/*" element={<PublicRoutes  />} />
       
        <Route
          path="/host/landing"
          element={
            <RoleBasedRoute allowedRoles={[Roles.USER, Roles.HOST]}>
              <HostLanding />
            </RoleBasedRoute>
          }
        />

        {/* Protected User Routes */}
        <Route
          path="/user/*"
          element={
            <RoleBasedRoute allowedRoles={[Roles.USER]}>
              <UserRoutes />
            </RoleBasedRoute>
          }
        />

        {/* Protected Host Routes */}
        <Route
          path="/host/*"
          element={
            <RoleBasedRoute allowedRoles={[Roles.HOST]}>
              <HostRoutes />
            </RoleBasedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
