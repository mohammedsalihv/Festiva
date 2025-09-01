import React from "react";
import { USER_ROUTE } from "@/utils/constants/routes/user.routes";
import { Routes, Route } from "react-router-dom";
import Home from "@/pages/user/Home";
import MyBookings from "@/pages/user/MyBookings";
import BookingDetails from "@/pages/user/BookingDetails";
import Profile from "@/pages/user/Profile";
import MainServices from "@/pages/user/service/MainServices";
import PrivateRoute from "@/routes/user/Protect/PrivateRoute";
import ErrorAlert from "@/components/ErrorAlert";
import ServicesPage from "@/reusable-components/user/services/ServicesPage";
import ServiceDetails from "@/reusable-components/user/services/ServiceDetails";
import PaymentPage from "@/pages/user/PaymentPage";

const UserRoutes: React.FC = () => {
  return (
    <Routes>
      <Route
        path={USER_ROUTE.userPages.home}
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />
      <Route path={USER_ROUTE.userPages.profile} element={<Profile />} />
      <Route
        path={USER_ROUTE.userPages.bookings}
        element={
          <PrivateRoute>
            <MyBookings />
          </PrivateRoute>
        }
      />
      <Route
        path={USER_ROUTE.userPages.bookingDetail}
        element={
          <PrivateRoute>
            <BookingDetails />
          </PrivateRoute>
        }
      />

      <Route
        path={USER_ROUTE.userPages.payment}
        element={
          <PrivateRoute>
            <PaymentPage />
          </PrivateRoute>
        }
      />
      <Route
        path={USER_ROUTE.userPages.services}
        element={
          <PrivateRoute>
            <MainServices />
          </PrivateRoute>
        }
      />
      <Route
        path={USER_ROUTE.userPages.assetType}
        element={
          <PrivateRoute>
            <ServicesPage />
          </PrivateRoute>
        }
      />
      <Route
        path={USER_ROUTE.userPages.assetDetails}
        element={
          <PrivateRoute>
            <ServiceDetails />
          </PrivateRoute>
        }
      />
      <Route
        path={USER_ROUTE.notfound}
        element={<ErrorAlert statusCode={404} />}
      />
    </Routes>
  );
};

export default UserRoutes;
