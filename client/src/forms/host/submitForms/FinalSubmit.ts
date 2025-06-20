import { addVenue } from "@/api/host/hostService";
import {
  VenueDetails,
  LocationDetails,
  LocationFeatures,
  ImageDetails,
} from "@/utils/Types/host/services/venueTypes";
import { toast } from "react-toastify";
import { NavigateFunction } from "react-router-dom";
import { AppDispatch } from "@/redux/store";
import { resetLocationDetails } from "@/redux/Slice/host/common/locationSlice";
import { resetImages } from "@/redux/Slice/host/common/imageSlice";
import { resetLocationFeatures } from "@/redux/Slice/host/venue/locationFeaturesSlice";
import { resetVenueDetails } from "@/redux/Slice/host/venue/venueDetailsSlice";

export const handleFinalSubmit = async (
  venueDetails: VenueDetails,
  locationDetails: LocationDetails,
  images: ImageDetails,
  locationFeatures: LocationFeatures,
  navigate: NavigateFunction,
  dispatch: AppDispatch
) => {
  try {
    const { rent, ...restVenueDetails } = venueDetails;

    const formData = new FormData();

    Object.entries(restVenueDetails).forEach(([key, value]) => {
      if (!Array.isArray(value)) {
        formData.append(key, String(value));
      }
    });

    if (rent !== undefined) {
      formData.append("rent", String(rent));
    }
    locationFeatures.features.forEach((feature, index) => {
      formData.append(`features[${index}]`, feature);
    });

    locationFeatures.parkingFeatures.forEach((parking, index) => {
      formData.append(`parkingFeatures[${index}]`, parking);
    });

    formData.append("about", locationFeatures.about);
    formData.append("terms", locationFeatures.terms);

    venueDetails.timeSlots.forEach((slot) => {
      formData.append("timeSlots[]", slot);
    });

    venueDetails.availableDates.forEach((date) => {
      formData.append("availableDates[]", date);
    });

    Object.entries(locationDetails).forEach(([key, value]) => {
      formData.append(`location[${key}]`, String(value));
    });

    images.Images.forEach((imageFile) => {
      formData.append("Images", imageFile);
    });

    await addVenue(formData);
    toast.success("All data submitted successfully!");
    dispatch(resetLocationDetails());
    dispatch(resetImages());
    dispatch(resetLocationFeatures());
    dispatch(resetVenueDetails());
    setTimeout(() => {
      navigate("/host/kind-of-service");
    }, 2000);
  } catch (error) {
    console.error("Submission Failed:", error);
    toast.error("Something went wrong while submitting!");
  }
};
