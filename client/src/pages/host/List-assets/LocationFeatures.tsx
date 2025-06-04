import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  toggleFeature,
  setLoading,
  toggleParkingFeature,
  setVenueDescription,
  setTerms,
} from "@/redux/Slice/host/locationFeaturesSlice";
import { Textarea } from "@/components/Textarea";
import { Checkbox } from "@/components/Checkbox";
import CustomToastContainer from "@/reusable-components/Messages/ToastContainer";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { setAllLocationFeatures } from "@/redux/Slice/host/locationFeaturesSlice";

const FEATURES = [
  "A/c",
  "Internet and wifi",
  "Dressing room",
  "Heigh ceiling bathrooms",
  "Fire escape",
  "Security",
  "Storage space",
  "Staff requirements",
  "Kids Playing area",
];

const parkingOptions = [
  "Truck/Motorhome parking Street",
  "Own place?",
  "Extra space",
  "Access options Street Level",
];

const LocationFeaturesTab: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { features, loading, parkingFeatures, venueDescription, terms } =
    useAppSelector((state) => state.locationFeatures);
  const [errors, setErrors] = useState({
    features: "",
    parking: "",
    venueDescription: "",
    terms: "",
  });
  const handleNext = () => {
    let hasError = false;

    const newErrors = {
      features: "",
      parking: "",
      venueDescription: "",
      terms: "",
    };

    if (features.length === 0) {
      newErrors.features = "Please select at least one feature.";
      hasError = true;
    }
    if (parkingFeatures.length === 0) {
      newErrors.parking = "Please select at least one parking feature.";
      hasError = true;
    }
    if (!venueDescription) {
      newErrors.venueDescription = "Please provide a description for your venue.";
      hasError = true;
    }
    if (!terms) {
      newErrors.terms = "Please provide the terms and conditions.";
      hasError = true;
    }

    setErrors(newErrors);

    if (hasError) {
      setTimeout(() => {
        setErrors({
          features: "",
          parking: "",
          venueDescription: "",
          terms: "",
        });
      }, 5000);
      return;
    }

    dispatch(setLoading(true));
    toast.success("Saving...");

    dispatch(
      setAllLocationFeatures({
        features,
        parkingFeatures,
        venueDescription,
        terms,
      })
    );

    setTimeout(() => {
      navigate("/host/image-upload");
      dispatch(setLoading(false));
    }, 2000);
  };

  return (
    <div className="max-w-5xl mx-auto px-3 md:px-1 sm:mt-16 py-8 font-prompt">
      <div className="grid lg:grid-cols-[2fr_1fr] gap-8 items-start">
        <div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-black mb-1">
            What key features does your location have?
          </h2>
          <p className="text-sm sm:text-base text-gray-600 mb-6 font-JosephicSans">
            Select up to five key features that apply to your location.
          </p>

          <div className="space-y-4">
            {FEATURES.map((feature) => (
              <div key={feature} className="flex items-center gap-3">
                <Checkbox
                  id={feature}
                  checked={features.includes(feature)}
                  onCheckedChange={() => dispatch(toggleFeature(feature))}
                />
                <label htmlFor={feature} className="text-sm font-JosephicSans">
                  {feature}
                </label>
              </div>
            ))}
          </div>
          {errors.features && (
            <p className="text-red-600 text-xs mt-3">{errors.parking}</p>
          )}
        </div>
        <div className="space-y-9">
          <h2 className="text-xl sm:text-2xl font-semibold text-black">
            Parking and Accessibility.
          </h2>
          <div className="space-y-3">
            {parkingOptions.map((option) => (
              <label
                key={option}
                className="flex items-center space-x-3 cursor-pointer"
              >
                <input
                  type="checkbox"
                  className="w-4 h-4"
                  checked={parkingFeatures.includes(option)}
                  onChange={() => dispatch(toggleParkingFeature(option))}
                />
                <span className="text-sm">{option}</span>
              </label>
            ))}
            {errors.parking && (
              <p className="text-red-600 text-xs mt-1">{errors.parking}</p>
            )}
          </div>
          <div>
            <label className="block mb-1 font-medium text-sm">
              Describe about your venue
            </label>
            <Textarea
              placeholder="Write something about your venue..."
              value={venueDescription}
              onChange={(e) => dispatch(setVenueDescription(e.target.value))}
            />
            {errors.venueDescription && (
              <p className="text-red-600 text-xs mt-1">{errors.venueDescription}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium text-sm">
              Terms and conditions
            </label>
            <Textarea
              placeholder="Mention terms and conditions for your venue..."
              value={terms}
              onChange={(e) => dispatch(setTerms(e.target.value))}
            />
            {errors.terms && (
              <p className="text-red-600 text-xs mt-1">{errors.terms}</p>
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-end mt-10">
        <button
          onClick={handleNext}
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

export default LocationFeaturesTab;
