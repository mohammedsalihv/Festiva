import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HOST_ROUTES } from "./utils/constants/routes/host.routes";
import { ADMIN_ROUTES } from "./utils/constants/routes/admin.routes";
import { USER_ROUTE } from "./utils/constants/routes/user.routes";
import UserRoutes from "./routes/user/UserRoutes";
import HostRoutes from "./routes/host/HostRoutes";
import AdminRoutes from "./routes/admin/AdminRoutes";
import PublicRoutes from "./routes/user/PublicRoutes";
import HostLanding from "@/pages/host/landing/HostLanding";
import HostPrivateRoute from "./routes/host/HostPrivateRoute";
import UserPrivateRoute from "./routes/user/Protect/UserPrivateRoute";
import AdminPrivateRoute from "./routes/admin/AdminPrivateRoutes";
import AdminLogin from "./pages/admin/auth/AdminLogin";
import RobotError from "./components/ErrorAlert";
import CustomToastContainer from "./reusable-components/messages/CustomToastContainer";

const App: React.FC = () => {
  return (
    <Router>
      <CustomToastContainer />
      <Routes>
        <Route path={HOST_ROUTES.hostPublicRoutes} element={<PublicRoutes />} />
        <Route
          path={HOST_ROUTES.error}
          element={<RobotError statusCode={404} />}
        />
        <Route
          path={HOST_ROUTES.Authentication.hostLandingPage}
          element={<HostLanding />}
        />

        <Route
          path={USER_ROUTE.userRoutes}
          element={
            <UserPrivateRoute>
              <UserRoutes />
            </UserPrivateRoute>
          }
        />

        <Route
          path={HOST_ROUTES.hostRoutes}
          element={
            <HostPrivateRoute>
              <HostRoutes />
            </HostPrivateRoute>
          }
        />
        <Route
          path={ADMIN_ROUTES.adminRoutes}
          element={
            <AdminPrivateRoute>
              <AdminRoutes />
            </AdminPrivateRoute>
          }
        />
        <Route
          path={ADMIN_ROUTES.Authentication.adminLogin}
          element={<AdminLogin />}
        />
      </Routes>
    </Router>
  );
};

export default App;
