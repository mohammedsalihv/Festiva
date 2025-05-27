import { addVenue } from "@/services/host/hostService";
import {
  VenueDetails,
  LocationDetails,
  LocationFeatures,
  ImageDetails,
} from "@/utils/Types/host/services/venueTypes";
import { toast } from "react-toastify";
import { NavigateFunction } from "react-router-dom";

export const handleFinalSubmit = async (
  venueDetails: VenueDetails,
  locationDetails: LocationDetails,
  images: ImageDetails,
  locationFeatures: LocationFeatures,
  navigate: NavigateFunction
) => {
  try {
    const { rent, ...restVenueDetails } = venueDetails;

    const formData = new FormData();

    Object.entries(restVenueDetails).forEach(([key, value]) => {
      formData.append(key, String(value));
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

    formData.append("venueDescription", locationFeatures.venueDescription);
    formData.append("terms", locationFeatures.terms);

    venueDetails.timeSlots.forEach((slot, index) => {
      formData.append(`timeSlots[${index}]`, slot);
    });

    venueDetails.availableDates.forEach((date, index) => {
      formData.append(`availableDates[${index}]`, date);
    });

    Object.entries(locationDetails).forEach(([key, value]) => {
      formData.append(`location[${key}]`, String(value));
    });

    images.Images.forEach((imageFile) => {
      formData.append("Images", imageFile);
    });
    await addVenue(formData); 
    toast.success("All data submitted successfully!");
    navigate("/host/dashboard");
  } catch (error) {
    console.error("Submission Failed:", error);
    toast.error("Something went wrong while submitting!");
  }
};
