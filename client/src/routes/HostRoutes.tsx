import React from "react";
import { Route, Routes } from "react-router-dom";

import HostLanding from "@/pages/host/HostLanding";
import KindOfService from "@/pages/host/KindOfService";
import LocationForm from "@/forms/host/submitForms/LocationForm";
import VenueForm from "@/forms/host/serviceForms/Venues/VenueForm";
import LocationFeaturesTab from "@/pages/host/LocationFeatures";
import ImageUpload from "@/pages/host/ImageUpload";
import CarForm from "@/forms/host/serviceForms/CarRents/CarForm";
import CarFeatures from "@/forms/host/serviceForms/CarRents/CarFeatures";


const HostRoutes : React.FC = () => {
  return (
    <>
    <Routes>
        <Route path="/" element={<HostLanding/>}/>
        <Route path="/kind-of-service" element={<KindOfService/>}/>
        <Route path="/location-form" element={<LocationForm/>}/>
        <Route path="/venue-details" element={<VenueForm/>}/>
        <Route path="/location-features" element={<LocationFeaturesTab/>}/>
        <Route path="/image-upload" element={<ImageUpload/>}/>
        <Route path="/car-rent-form" element={<CarForm/>}/>
        <Route path="/car-features-form" element={<CarFeatures/>}/>

    </Routes>
    </>
  )
}

export default HostRoutes