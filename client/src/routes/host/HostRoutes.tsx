import React from "react";
import { Routes, Route } from "react-router-dom";
import HostDashboard from "@/pages/host/landing/HostDashboard";
import KindOfService from "@/forms/host/serviceForms/Common/KindOfService";
import LocationForm from "@/forms/host/serviceForms/Common/LocationForm";
import VenueForm from "@/forms/host/serviceForms/Venues/VenueForm";
import LocationFeaturesTab from "@/forms/host/serviceForms/Venues/VenueDetails";
import ImageUpload from "@/forms/host/serviceForms/Common/ImageUpload";
import RentCarForm from "@/forms/host/serviceForms/CarRents/RentCarForm";
import CarFeatures from "@/forms/host/serviceForms/CarRents/RentCarDetails";
import CatersForm from "@/forms/host/serviceForms/Caters/CatersForm";
import CatersDetailsForm from "@/forms/host/serviceForms/Caters/CatersDetailsForm";
import PhotoVideoForm from "@/forms/host/serviceForms/Studio/StudioForm";
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
      <Route path="rentcar-service" element={<RentCarForm />} />
      <Route path="rentcar-features" element={<CarFeatures />} />
      <Route path="catering-service" element={<CatersForm />} />
      <Route path="caters-details" element={<CatersDetailsForm />} />
      <Route path="photo-video-service" element={<PhotoVideoForm />} />

      <Route path="*" element={<ErrorAlert statusCode={404} />} />
    </Routes>
  );
};

export default HostRoutes;
