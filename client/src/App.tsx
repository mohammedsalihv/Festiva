import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserRoutes from "./routes/user/UserRoutes";
import HostRoutes from "./routes/host/HostRoutes";
import AdminRoutes from "./routes/admin/AdminRoutes";
import PublicRoutes from "./routes/user/PublicRoutes";
import HostLanding from "@/pages/host/landing/HostLanding";
import HostLogin from "./pages/host/Auth/HostLogin";
import HostRegister from "./pages/host/Auth/HostSignup";
import HostPrivateRoute from "./routes/host/HostPrivateRoute";
import UserPrivateRoute from "./routes/user/Protect/UserPrivateRoute";
import AdminPrivateRoute from "./routes/admin/AdminPrivateRoutes";
import AdminLogin from "./pages/admin/auth/AdminLogin";
import RobotError from "./components/ErrorAlert";
import CustomToastContainer from "./reusable-components/Messages/ToastContainer";

const App: React.FC = () => {
  return (
    <Router>

      <CustomToastContainer/>
      <Routes>
        <Route path="/*" element={<PublicRoutes />} />
        <Route path="/error" element={<RobotError statusCode={404} />} />
        <Route path="/host/landing" element={<HostLanding />} />
        <Route path="/host/login" element={<HostLogin />} />
        <Route path="/host/register" element={<HostRegister />} />

        <Route
          path="/user/*"
          element={
            <UserPrivateRoute>
              <UserRoutes />
            </UserPrivateRoute>
          }
        />

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
        <Route path="/admin/login" element={<AdminLogin />} />
      </Routes>
    </Router>
  );
};

export default App;
