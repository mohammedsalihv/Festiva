import React from "react";
import { Routes, Route } from "react-router-dom";

import Login from "@/pages/user/Auth/Login";
import Signup from "@/pages/user/Auth/Signup";
import Otp from "@/pages/user/Auth/Otp";
import Home from "@/pages/user/Home";
import MyBookings from "@/pages/user/MyBookings";
import Profile from "@/pages/user/Profile";
import PrivateRoute from "@/routes/Protect/PrivateRoute";
import ErrorAlert from "@/components/ErrorAlert";

const UserRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/otp-verification" element={<Otp />} />

      <Route
        path="/home"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />
      <Route path="/profile" element={<Profile />} />
      <Route
        path="/bookings"
        element={
          <PrivateRoute>
            <MyBookings />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<ErrorAlert statusCode={404} />} />
    </Routes>
  );
};

export default UserRoutes;
