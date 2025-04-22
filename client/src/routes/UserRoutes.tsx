import React from "react";
import { Routes, Route } from "react-router-dom";

import Login from "@/pages/user/Auth/Login";
import Signup from "@/pages/user/Auth/Signup";
import Otp from "@/pages/user/Auth/Otp";
import Home from "@/pages/user/services/Home";
import MyBookings from "@/pages/user/services/MyBookings";
import Profile from "@/pages/user/services/Profile";
import NotFound from "@/components/NotFound";
import PrivateRoute from "./Protect/PrivateRoute";

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
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />
      <Route
        path="/bookings"
        element={
          <PrivateRoute>
            <MyBookings />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default UserRoutes;
