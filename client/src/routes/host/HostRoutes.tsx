import React from "react";
import { Routes, Route } from "react-router-dom";
import HostDashboard from "@/pages/host/landing/HostDashboard";
import KindOfService from "@/forms/host/serviceForms/Common/KindOfService";

import VenueForm from "@/forms/host/serviceForms/Venues/VenueForm";
import VenueDetailsForm from "@/forms/host/serviceForms/Venues/VenueDetails";
import RentCarForm from "@/forms/host/serviceForms/CarRents/RentCarForm";
import RentCarDetailsForm from "@/forms/host/serviceForms/CarRents/RentCarDetails";
import CatersForm from "@/forms/host/serviceForms/Caters/CatersForm";
import CatersDetailsForm from "@/forms/host/serviceForms/Caters/CatersDetailsForm";
import StudioForm from "@/forms/host/serviceForms/Studio/StudioForm";
import StudioDetailsForm from "@/forms/host/serviceForms/Studio/StudioDetailsForm";

import ImageUpload from "@/forms/host/serviceForms/Common/ImageUpload";
import LocationForm from "@/forms/host/serviceForms/Common/LocationForm";
import ErrorAlert from "@/components/ErrorAlert";

const HostRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="dashboard" element={<HostDashboard />} />
      <Route path="kind-of-service" element={<KindOfService />} />

      <Route path="/list/venue-service" element={<VenueForm />} />
      <Route path="/list/venue-details" element={<VenueDetailsForm />} />
      <Route path="/list/rentcar-service" element={<RentCarForm />} />
      <Route path="/list/rentcar-details" element={<RentCarDetailsForm />} />
      <Route path="/list/caters-service" element={<CatersForm />} />
      <Route path="/list/caters-details" element={<CatersDetailsForm />} />
      <Route path="/list/studio-service" element={<StudioForm />} />
      <Route path="/list/studio-details" element={<StudioDetailsForm />} />

      <Route path="/list/image-upload" element={<ImageUpload />} />
      <Route path="/list/location-details" element={<LocationForm />} />
      <Route path="*" element={<ErrorAlert statusCode={404} />} />
    </Routes>
  );
};

export default HostRoutes;
