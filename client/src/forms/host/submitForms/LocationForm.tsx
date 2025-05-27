import { Input } from "@/components/Input";
import { Images } from "@/assets";
import { RootState } from "@/redux/store";
import { useState } from "react";
import {
  locationFormState,
  validateLocationForm,
} from "@/utils/validations/host/service/LocationFormValidation";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import CustomToastContainer from "../../../reusable-components/Messages/ToastContainer";
import { useDispatch, useSelector } from "react-redux";
import { setLocationDetails } from "@/redux/Slice/host/locationSlice";
import { handleFinalSubmit } from "./FinalSubmit";
import { VenueDetails, LocationFeatures , ImageDetails } from "@/utils/Types/host/services/venueTypes";
import { useNavigate } from "react-router-dom"; 
import base64ToFile from "@/utils/Base64ToFile";

interface ErrorState {
  houseNo?: string;
  street?: string;
  district?: string;
  state?: string;
  country?: string;
  zip?: string;
}

const LocationForm = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const [errors, setErrors] = useState<ErrorState>({});
  const [locationForm, setLocationForm] = useState<locationFormState>({
    houseNo: "",
    street: "",
    district: "",
    state: "",
    country: "",
    zip: "",
  });

  const venueDetails = useSelector<RootState, VenueDetails>((state) => state.venueDetails);
  const images = useSelector<RootState, string[]>((state) => state.images.croppedImages);

const fileImages: ImageDetails = {
  Images: images.map((base64Image, index) =>
    base64ToFile(base64Image, `image-${index}.jpg`, 'image/jpeg')
  ),
};


  const locationFeatures = useSelector<RootState, LocationFeatures>((state) => state.locationFeatures);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLocationForm((prev) => ({ ...prev, [name]: value }));

    if (errors[name as keyof ErrorState]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    const { isValid, errors: validationErrors } = validateLocationForm(locationForm);
    if (!isValid) {
      setErrors(validationErrors);
      toast.error("Please correct the errors in the form.");
      setTimeout(() => {
        setErrors({});
      }, 5000);
      setLoading(false);
      return;
    }

    try {
      dispatch(setLocationDetails(locationForm));
      await handleFinalSubmit(venueDetails, locationForm, fileImages, locationFeatures, navigate);
    } catch (error: unknown) {
      setLoading(false);
      toast.error("Something went wrong");
      console.error(error);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-2 sm:mt-16 py-10 font-prompt">
      <div className="grid lg:grid-cols-[2fr_1fr] gap-8 items-start">
        <div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-black mb-1">
            What is the address of your location?
          </h2>
          <p className="text-sm sm:text-base text-gray-600 mb-6 font-JosephicSans">
            Guests will only get your exact address once they’ve booked a
            reservation.
          </p>

          <form className="space-y-5">
            <div>
              <Input
                type="text"
                placeholder="House no"
                name="houseNo"
                value={locationForm.houseNo}
                onChange={handleChange}
              />
              {errors.houseNo && (
                <p className="text-red-500 text-xs mt-1">{errors.houseNo}</p>
              )}
            </div>

            <div>
              <Input
                type="text"
                placeholder="Street"
                name="street"
                value={locationForm.street}
                onChange={handleChange}
              />
              {errors.street && (
                <p className="text-red-500 text-xs mt-1">{errors.street}</p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Input
                  type="text"
                  placeholder="District"
                  name="district"
                  value={locationForm.district}
                  onChange={handleChange}
                />
                {errors.district && (
                  <p className="text-red-500 text-xs mt-1">{errors.district}</p>
                )}
              </div>

              <div>
                <Input
                  type="text"
                  placeholder="State"
                  name="state"
                  value={locationForm.state}
                  onChange={handleChange}
                />
                {errors.state && (
                  <p className="text-red-500 text-xs mt-1">{errors.state}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Input
                  type="text"
                  placeholder="Country"
                  name="country"
                  value={locationForm.country}
                  onChange={handleChange}
                />
                {errors.country && (
                  <p className="text-red-500 text-xs mt-1">{errors.country}</p>
                )}
              </div>

              <div>
                <Input
                  type="text"
                  placeholder="Zip"
                  name="zip"
                  value={locationForm.zip}
                  onChange={handleChange}
                />
                {errors.zip && (
                  <p className="text-red-500 text-xs mt-1">{errors.zip}</p>
                )}
              </div>
            </div>
          </form>
        </div>
        <div className="border rounded-lg p-6 hidden lg:block min-h-[360px]">
          <img
            src={Images.kind_location}
            alt="Info"
            className="w-10 h-10 mx-auto mb-4"
          />
          <p className="text-sm text-gray-600 text-center sm:text-left font-JosephicSans mb-2">
            If your location is associated with more than one category, select
            the one that fits best. You can select up to five types.
          </p>
          <p className="text-sm text-gray-600 text-center sm:text-left font-JosephicSans mt-4 mb-1">
            📍 <strong>Why location matters?</strong>
          </p>
          <p className="text-sm text-gray-600 text-center sm:text-left font-JosephicSans">
            Accurate location info helps your place appear in search results,
            increases trust, and ensures visitors can easily reach you. For
            businesses, it's key to better visibility and smooth operations.
          </p>
        </div>
      </div>
      <div className="flex justify-end mt-10">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`flex items-center justify-center gap-2 bg-main_host text-white px-10 py-3 rounded-lg transition ${
            loading ? "opacity-70 cursor-not-allowed" : "hover:brightness-110"
          }`}
        >
          {loading && (
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8z"
              />
            </svg>
          )}
          {loading ? "Saving..." : "Next"}
        </button>
      </div>
      <CustomToastContainer />
    </div>
  );
};

export default LocationForm;