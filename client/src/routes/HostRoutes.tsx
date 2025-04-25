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


const HostRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Dashboard */}
      <Route path="dashboard" element={<HostDashboard />} />
      
      {/* Service Management */}
      <Route path="kind-of-service" element={<KindOfService />} />
      <Route path="location-form" element={<LocationForm />} />
      <Route path="venue-details" element={<VenueForm />} />
      <Route path="location-features" element={<LocationFeaturesTab />} />
      <Route path="image-upload" element={<ImageUpload />} />
      <Route path="car-rent-form" element={<CarForm />} />
      <Route path="car-features-form" element={<CarFeatures />} />
      
      
      {/* Catch-all route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default HostRoutes;