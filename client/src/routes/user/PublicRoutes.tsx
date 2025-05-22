import Login from "@/pages/user/Auth/Login";
import Otp from "@/pages/user/Auth/Otp";
import Signup from "@/pages/user/Auth/Signup";
import { Routes, Route } from "react-router-dom";
import Landing from "@/pages/user/Landing";
import ErrorAlert from "@/components/ErrorAlert";
import PublicOnlyRoute from "../Protect/PublicOnlyRoute";

const PublicRoutes = () => (
  <Routes>
    <Route path="/" element={<Landing />} />

    <Route
      path="/login"
      element={
        <PublicOnlyRoute>
          <Login />
        </PublicOnlyRoute>
      }
    />
    <Route
      path="/signup"
      element={
        <PublicOnlyRoute>
          <Signup />
        </PublicOnlyRoute>
      }
    />
    <Route
      path="/otp-verification"
      element={
        <PublicOnlyRoute>
          <Otp />
        </PublicOnlyRoute>
      }
    />
    <Route path="*" element={<ErrorAlert statusCode={404} />} />
  </Routes>
);

export default PublicRoutes;
