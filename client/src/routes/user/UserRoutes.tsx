import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "@/pages/user/Home";
import MyBookings from "@/pages/user/MyBookings";
import Profile from "@/pages/user/Profile";
import MainServices from "@/pages/user/MainServices";
import Venuetypes from "@/pages/user/service/venue/Venuetypes";
import Venues from "@/pages/user/service/venue/Venues";
import PrivateRoute from "@/routes/Protect/PrivateRoute";
import ErrorAlert from "@/components/ErrorAlert";

const UserRoutes: React.FC = () => {
  return (
    <Routes>
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
       <Route
        path="/service"
        element={
          <PrivateRoute>
            <MainServices />
          </PrivateRoute>
        }
      />
      <Route
        path="/venues/types"
        element={
          <PrivateRoute>
            <Venuetypes />
          </PrivateRoute>
        }
      />
       <Route
        path="/venues"
        element={
          <PrivateRoute>
            <Venues />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<ErrorAlert statusCode={404} />} />
    </Routes>
  );
};

export default UserRoutes;
