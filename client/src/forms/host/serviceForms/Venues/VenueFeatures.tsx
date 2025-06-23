import { useAppDispatch } from "@/redux/hooks";
import { Textarea } from "@/components/Textarea";
import { Checkbox } from "@/components/Checkbox";
import CustomToastContainer from "@/reusable-components/Messages/ToastContainer";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  venueFeaturesOptions,
  venueParkingOptions,
} from "@/utils/Options/host/venue/venueFeatures";
import { useState } from "react";
import {
  VenueFeaturesErrorState,
  VenueFeaturesState,
  validateVenueFeaturesForm,
} from "@/utils/validations/host/service/VenueDetailsValidation";
import { setVenueFeatures } from "@/redux/Slice/host/venue/venueSlice";
import Spinner from "@/components/Spinner";

const VenueFeatures: React.FC = () => {
  const [errors, setErrors] = useState<VenueFeaturesErrorState>({
    about: "",
    terms: "",
    parkingFeatures: [],
    features: [],
  });
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<VenueFeaturesState>({
    about: "",
    terms: "",
    parkingFeatures: [],
    features: [],
  });

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleCheckboxChange = (
    checked: boolean | "indeterminate",
    id: string,
    type: "features" | "parkingFeatures"
  ) => {
    setForm((prev) => {
      const updatedList = checked
        ? [...prev[type], id]
        : prev[type].filter((item) => item !== id);

      return {
        ...prev,
        [type]: updatedList,
      };
    });

    if (errors[type]) {
      setErrors((prev) => ({ ...prev, [type]: "" }));
    }
  };

  const handleNext = () => {
    setLoading(true);

    const { isValid, errors: validationErrors } =
      validateVenueFeaturesForm(form);

    if (!isValid) {
      setErrors({
        features: validationErrors.features ? [validationErrors.features] : [],
        parkingFeatures: validationErrors.parkingFeatures
          ? [validationErrors.parkingFeatures]
          : [],
        about: validationErrors.about ?? "",
        terms: validationErrors.terms ?? "",
      });

      toast.error("Please correct the errors in the form.");
      setTimeout(() => setErrors({} as VenueFeaturesErrorState), 5000);
      setLoading(false);
      return;
    }

    dispatch(setVenueFeatures(form));
    toast.success("Saving...");

    setTimeout(() => {
      navigate("/host/image-upload");
      setLoading(true);
    }, 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:mt-16 py-8 font-prompt">
      <div className="grid lg:grid-cols-[2fr_1fr] gap-8 items-start">
        <div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-black mb-1">
            What key features does your location have?
          </h2>
          <p className="text-sm sm:text-base text-gray-600 mb-6 font-JosephicSans">
            Select up to five key features that apply to your location.
          </p>

          <div className="space-y-4">
            {venueFeaturesOptions.map((feature) => (
              <div key={feature} className="flex items-center gap-3">
                <Checkbox
                  id={feature}
                  checked={form.features.includes(feature)}
                  onCheckedChange={(checked) =>
                    handleCheckboxChange(checked, feature, "features")
                  }
                  className={
                    errors.features?.length > 0
                      ? "border-red-600"
                      : "border-black"
                  }
                />

                <label htmlFor={feature} className="text-sm">
                  {feature}
                </label>
              </div>
            ))}
          </div>
          {errors.features?.length > 0 && (
            <p className="text-red-600 text-xs mt-3">{errors.features}</p>
          )}
        </div>
        <div className="space-y-9">
          <h2 className="text-xl sm:text-2xl font-semibold text-black">
            Parking and Accessibility.
          </h2>
          <div className="space-y-3">
            {venueParkingOptions.map((option) => (
              <label
                key={option}
                className="flex items-center space-x-3 cursor-pointer"
              >
                <Checkbox
                  id={option}
                  checked={form.parkingFeatures.includes(option)}
                  onCheckedChange={(checked) =>
                    handleCheckboxChange(checked, option, "parkingFeatures")
                  }
                  className={`${
                    errors.parkingFeatures?.length > 0
                      ? "border-red-600"
                      : "border-black"
                  }`}
                />

                <span className="text-sm">{option}</span>
              </label>
            ))}
            {errors.parkingFeatures?.length > 0 && (
              <p className="text-red-600 text-xs mt-1">
                {errors.parkingFeatures}
              </p>
            )}
          </div>
          <div>
            <label className="block mb-1 font-medium text-sm">
              Describe about your venue
            </label>
            <Textarea
              name="about"
              value={form.about}
              onChange={handleChange}
              className={`${errors.about ? "border-red-600" : "border-black"}`}
            />
            {errors.about && (
              <p className="text-red-600 text-xs mt-1">{errors.about}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium text-sm">
              Terms and conditions
            </label>
            <Textarea
              name="terms"
              value={form.terms}
              onChange={handleChange}
              className={`${errors.terms ? "border-red-600" : "border-black"}`}
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
          {loading ? <Spinner text="Saving..." /> : "Next"}
        </button>
      </div>
      <CustomToastContainer />
    </div>
  );
};

export default VenueFeatures;
