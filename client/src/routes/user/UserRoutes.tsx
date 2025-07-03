import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "@/pages/user/Home";
import MyBookings from "@/pages/user/MyBookings";
import Profile from "@/pages/user/Profile";
import MainServices from "@/pages/user/MainServices";
import Venuetypes from "@/pages/user/service/venue/Venuetypes";
import PrivateRoute from "@/routes/user/Protect/PrivateRoute";
import ErrorAlert from "@/components/ErrorAlert";
import ServicesPage from "@/reusable-components/user/services/ServicesPage";
import ServiceDetails from "@/reusable-components/user/services/ServiceDetails";

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
        path="/services"
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
        path="/assets/:type"
        element={
          <PrivateRoute>
            <ServicesPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/services/:type/details/:id"
        element={
          <PrivateRoute>
            <ServiceDetails />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<ErrorAlert statusCode={404} />} />
    </Routes>
  );
};

export default UserRoutes;
