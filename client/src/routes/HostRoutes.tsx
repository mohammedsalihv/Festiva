import React from "react";
import { Routes, Route } from "react-router-dom";


import HostDashboard from "@/pages/host/landing/HostDashboard";
import KindOfService from "@/pages/host/List-assets/KindOfService";
import LocationForm from "@/forms/host/submitForms/LocationForm";
import VenueForm from "@/forms/host/serviceForms/Venues/VenueForm";
import LocationFeaturesTab from "@/pages/host/List-assets/LocationFeatures";
import ImageUpload from "@/pages/host/List-assets/ImageUpload";
import CarForm from "@/forms/host/serviceForms/CarRents/CarForm";
import CarFeatures from "@/forms/host/serviceForms/CarRents/CarFeatures";
import NotFound from "@/components/NotFound";
import PrivateRoute from "./Protect/PrivateRoute";



const HostRoutes: React.FC = () => {
  return (
    <Routes>
      <Route
        path="/host/dashboard"
        element={
          <PrivateRoute>
            <HostDashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/host/kind-of-service"
        element={
          <PrivateRoute>
            <KindOfService />
          </PrivateRoute>
        }
      />
      <Route
        path="/host/location-form"
        element={
          <PrivateRoute>
            <LocationForm />
          </PrivateRoute>
        }
      />
      <Route
        path="/host/venue-details"
        element={
          <PrivateRoute>
            <VenueForm />
          </PrivateRoute>
        }
      />
      <Route
        path="/host/location-features"
        element={
          <PrivateRoute>
            <LocationFeaturesTab />
          </PrivateRoute>
        }
      />
      <Route
        path="/host/image-upload"
        element={
          <PrivateRoute>
            <ImageUpload />
          </PrivateRoute>
        }
      />
      <Route
        path="/host/car-rent-form"
        element={
          <PrivateRoute>
            <CarForm />
          </PrivateRoute>
        }
      />
      <Route
        path="/host/car-features-form"
        element={
          <PrivateRoute>
            <CarFeatures />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default HostRoutes;
