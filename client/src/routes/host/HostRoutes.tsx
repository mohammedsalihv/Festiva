import React from "react";
import { Routes, Route } from "react-router-dom";
import { HOST_ROUTES } from "@/utils/constants/routes/host.routes";
import HostDashboard from "@/pages/host/landing/HostDashboard";
import HostProfile from "@/pages/host/landing/HostProfile";
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

import { AssetStatus } from "@/pages/host/landing/AssetStatus";
import MyAssets from "@/pages/host/landing/MyAssets";
import { AssetDetails } from "@/pages/host/landing/AssetDetails";
import Bookings from "@/pages/host/landing/Bookings";

const HostRoutes: React.FC = () => {
  return (
    <Routes>
      <Route
        path={HOST_ROUTES.hostAccount.hostDashboard}
        element={<HostDashboard />}
      />
      <Route
        path={HOST_ROUTES.hostAccount.assetStatus}
        element={<AssetStatus />}
      />
      <Route path={HOST_ROUTES.hostAccount.myAssets} element={<MyAssets />} />
      <Route path="/assets/details/:type/:id" element={<AssetDetails />} />
      <Route path={HOST_ROUTES.hostAccount.bookings} element={<Bookings/>} />

      <Route
        path={HOST_ROUTES.hostAccount.hostProfile}
        element={<HostProfile />}
      />
      <Route
        path={HOST_ROUTES.hostPages.kindOfServicePage}
        element={<KindOfService />}
      />

      <Route
        path={HOST_ROUTES.hostListingServices.venueService.venueServiceForm}
        element={<VenueForm />}
      />
      <Route
        path={
          HOST_ROUTES.hostListingServices.venueService.venueServiceDetailsForm
        }
        element={<VenueDetailsForm />}
      />
      <Route
        path={HOST_ROUTES.hostListingServices.rentcarService.rentcarServiceForm}
        element={<RentCarForm />}
      />
      <Route
        path={
          HOST_ROUTES.hostListingServices.rentcarService
            .rentcarServiceDetailsForm
        }
        element={<RentCarDetailsForm />}
      />
      <Route
        path={HOST_ROUTES.hostListingServices.catersService.catersServiceForm}
        element={<CatersForm />}
      />
      <Route
        path={
          HOST_ROUTES.hostListingServices.catersService.catersServiceDetailsForm
        }
        element={<CatersDetailsForm />}
      />
      <Route
        path={HOST_ROUTES.hostListingServices.studioService.studioServiceForm}
        element={<StudioForm />}
      />
      <Route
        path={
          HOST_ROUTES.hostListingServices.studioService.studioServiceDetailsForm
        }
        element={<StudioDetailsForm />}
      />

      <Route
        path={HOST_ROUTES.hostListingServices.imageUpload}
        element={<ImageUpload />}
      />
      <Route
        path={HOST_ROUTES.hostListingServices.locationDetails}
        element={<LocationForm />}
      />

      <Route
        path={HOST_ROUTES.notfound}
        element={<ErrorAlert statusCode={404} />}
      />
    </Routes>
  );
};

export default HostRoutes;
