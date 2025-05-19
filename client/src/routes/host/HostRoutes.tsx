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
import CateringForm from "@/forms/host/serviceForms/Caters/CateringForm";
import PhotoVideoForm from "@/forms/host/serviceForms/Studio/PhotoVideoForm";
import ErrorAlert from "@/components/ErrorAlert";

const HostRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="dashboard" element={<HostDashboard />} />

      <Route path="kind-of-service" element={<KindOfService />} />
      <Route path="location-details" element={<LocationForm />} />
      <Route path="venue-service" element={<VenueForm />} />
      <Route path="location-features" element={<LocationFeaturesTab />} />
      <Route path="image-upload" element={<ImageUpload />} />
      <Route path="car-rent-service" element={<CarForm />} />
      <Route path="car-features" element={<CarFeatures />} />
      <Route path="catering-service" element={<CateringForm />} />
      <Route path="photo-video-service" element={<PhotoVideoForm />} />

      <Route path="*" element={<ErrorAlert statusCode={404} />} />
    </Routes>
  );
};

export default HostRoutes;
