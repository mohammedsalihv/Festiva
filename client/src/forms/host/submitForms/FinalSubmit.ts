import {  useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { addVenue, AddVenueData } from "@/services/Auth/host/hostService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const FinalSubmit = () => {
  
  const navigate = useNavigate()
  const venueDetails = useSelector((state: RootState) => state.venueDetails);
  const locationDetails = useSelector((state: RootState) => state.location);
  const images = useSelector((state: RootState) => state.images);
  const locationFeatures = useSelector((state: RootState) => state.locationFeatures);

  const handleFinalSubmit = async () => {

    const { rent, ...restVenueDetails } = venueDetails;
    const finalData:AddVenueData= {
        ...restVenueDetails,
        rent: rent ?? undefined,
        images,
        location: locationDetails,
        locationFeatures,
        features: locationFeatures.features,
        parkingFeatures: locationFeatures.parkingFeatures,
        venueDescription: locationFeatures.venueDescription,
        terms: locationFeatures.terms,
        venueImages: images,
      };
    try {

      await addVenue(finalData)
      console.log("Submitted Successfully");
      toast.success("All data submitted")
      setTimeout(()=>{
        navigate('/host/dashboard')
      })
    } catch (error) {
      console.error("Submission Failed:", error);
      toast.error("Submission went wrong")
    }
  };
  handleFinalSubmit()
};

export default FinalSubmit
