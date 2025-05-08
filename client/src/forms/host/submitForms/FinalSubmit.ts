import { AddVenueData, addVenue } from "@/services/host/hostService";
import { toast } from "react-toastify";
import { NavigateFunction } from "react-router-dom";

export const handleFinalSubmit = async (
  venueDetails: any,
  locationDetails: any,
  images: any,
  locationFeatures: any,
  navigate: NavigateFunction // Add navigate as a parameter
) => {
  try {
    const { rent, ...restVenueDetails } = venueDetails;

    const finalData: AddVenueData = {
      ...restVenueDetails, // From venueDetails, excluding rent
      rent: rent ?? undefined,
      features: locationFeatures.features,
      parkingFeatures: locationFeatures.parkingFeatures,
      venueDescription: locationFeatures.venueDescription,
      terms: locationFeatures.terms,
      venueImages: images.croppedImages,
      location: locationDetails,
    };

    await addVenue(finalData);

    console.log("Submitted Successfully");
    toast.success("All data submitted successfully!");
    navigate("/host/dashboard"); // Use the passed navigate function
  } catch (error) {
    console.error("Submission Failed:", error);
    toast.error("Something went wrong while submitting!");
  }
};