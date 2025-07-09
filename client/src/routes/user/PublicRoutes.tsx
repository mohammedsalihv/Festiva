import { USER_ROUTE } from "@/utils/constants/routes/user.routes";
import Login from "@/pages/user/Auth/Login";
import Signup from "@/pages/user/Auth/Signup";
import { Routes, Route } from "react-router-dom";
import Landing from "@/pages/user/Landing";
import ErrorAlert from "@/components/ErrorAlert";
import PublicOnlyRoute from "./Protect/PublicOnlyRoute";

const PublicRoutes = () => (
  <Routes>
    <Route path={USER_ROUTE.Authentication.userLanding} element={<Landing />} />

    <Route
      path={USER_ROUTE.Authentication.userLogin}
      element={
        <PublicOnlyRoute>
          <Login />
        </PublicOnlyRoute>
      }
    />
    <Route
      path={USER_ROUTE.Authentication.userSignup}
      element={
        <PublicOnlyRoute>
          <Signup />
        </PublicOnlyRoute>
      }
    />
    <Route
      path={USER_ROUTE.notfound}
      element={<ErrorAlert statusCode={404} />}
    />
  </Routes>
);

export default PublicRoutes;
