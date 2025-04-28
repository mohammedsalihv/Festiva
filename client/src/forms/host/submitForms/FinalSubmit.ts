// FinalSubmit.ts
import { AddVenueData, addVenue } from "@/services/Auth/host/hostService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


export const handleFinalSubmit = async (
  venueDetails: any,
  locationDetails: any,
  images: any,
  locationFeatures: any
) => {
  const navigate = useNavigate();

  try {
    const { rent, ...restVenueDetails } = venueDetails;

    const finalData: AddVenueData = {
      ...restVenueDetails,
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
    navigate('/host/dashboard');
  } catch (error) {
    console.error("Submission Failed:", error);
    toast.error("Something went wrong while submitting!");
  }
};
