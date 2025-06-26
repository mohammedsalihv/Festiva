import { Images } from "@/assets";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import CustomToastContainer from "@/reusable-components/Messages/ToastContainer";
import { validateCatersDetailsForm } from "@/utils/validations/host/service/catersFormValidation";
import {
  catersDetailsFormState,
  initialCatersDetailsFormState,
  catersDetailsFormErrorState,
} from "@/utils/Types/host/services/catersTypes";
import { useDispatch } from "react-redux";
import Spinner from "@/components/Spinner";
import { setServiceType } from "@/redux/Slice/host/common/serviceTypeSlice";
import { setCatersDetailsForm } from "@/redux/Slice/host/caters/catersSlice";
import { Textarea } from "@/components/Textarea";
import { Checkbox } from "@/components/Checkbox";
import { catersFeatures } from "@/utils/Options/host/caters/catersDetails";

const CatersDetailsForm = () => {
  const [caterDetailsForm, setCaterDetailsForm] =
    useState<catersDetailsFormState>(initialCatersDetailsFormState);

  const [errors, setErrors] = useState<catersDetailsFormErrorState>(initialCatersDetailsFormState);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setCaterDetailsForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleCheckBox = (
    checked: boolean | "indeterminate",
    id: string,
    type: "features"
  ) => {
    setCaterDetailsForm((prev) => {
      const currentList = prev[type] ?? [];
      const updatedList = checked
        ? [...currentList, id]
        : currentList.filter((item) => item !== id);

      return { ...prev, [type]: updatedList };
    });

    if (errors[type]) {
      setErrors((prev) => ({ ...prev, [type]: [] }));
    }
  };

  const handleSubmit = () => {
    setLoading(true);

    const { isValid, errors: validationErrors } =
      validateCatersDetailsForm(caterDetailsForm);

    if (!isValid) {
      setErrors(validationErrors);
      toast.error("Please correct the errors in the form.");
      setTimeout(() => setErrors(initialCatersDetailsFormState), 5000);
      setLoading(false);
      return;
    }

    dispatch(setServiceType("caters"));
    dispatch(setCatersDetailsForm(caterDetailsForm));
    toast.success("Saving...");
    setTimeout(() => navigate("/host/location-features"), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 font-prompt">
      <div className="grid lg:grid-cols-[2fr_1fr] gap-8 items-start">
        <div>
          <h2 className="text-2xl md:text-2xl font-bold text-black mb-1">
            Tell us about your catering service
          </h2>
          <p className="text-sm md:text-sm text-gray-600 mb-6">
            This helps us better match guests to your service.
          </p>

          <form className="space-y-5 py-3">
            <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
              <div className="space-y-9">
                <h2 className="text-base sm:text-base font-semibold text-black">
                  Parking and Accessibility.
                </h2>
                <div className="space-y-3">
                  {catersFeatures.map((option) => (
                    <label
                      key={option}
                      className="flex items-center space-x-3 cursor-pointer"
                    >
                      <Checkbox
                        id={option}
                        checked={caterDetailsForm.features?.includes(option)}
                        onCheckedChange={(checked) =>
                          handleCheckBox(checked, option, "features")
                        }
                        className={`${
                          errors.features?.length > 0
                            ? "border-red-600"
                            : "border-black"
                        }`}
                      />
                      <span className="text-sm">{option}</span>
                    </label>
                  ))}
                  {errors.features?.length > 0 && (
                    <p className="text-red-600 text-xs mt-1">
                      {errors.features}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium mt-3">
                  Description
                </label>
                <Textarea
                  name="description"
                  value={caterDetailsForm.description}
                  onChange={handleChange}
                  className={`${
                    errors.description ? "border-red-600" : "border-black"
                  }`}
                />
                {errors.description && (
                  <p className="text-red-600 text-xs mt-1">
                    {errors.description}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium mt-3">
                    About
                  </label>
                  <Textarea
                    name="about"
                    value={caterDetailsForm.about}
                    onChange={handleChange}
                    className={`${
                      errors.about ? "border-red-600" : "border-black"
                    }`}
                  />
                  {errors.about && (
                    <p className="text-red-600 text-xs mt-1">{errors.about}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium mt-3">
                    Terms & Conditions
                  </label>
                  <Textarea
                    name="conditions"
                    value={caterDetailsForm.conditions}
                    onChange={handleChange}
                    className={`${
                      errors.conditions ? "border-red-600" : "border-black"
                    }`}
                  />
                  {errors.conditions && (
                    <p className="text-red-600 text-xs mt-1">
                      {errors.conditions}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </form>
        </div>

        <div className="border rounded-lg p-6 hidden lg:block">
          <img
            src={Images.catering}
            alt="Catering illustration"
            className="w-20 h-20 mx-auto mb-4"
          />
          <p className="text-sm text-gray-600 text-center">
            Provide accurate information to attract the right guests for your
            service.
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
          {loading ? <Spinner text={"Saving..."} /> : "Next"}
        </button>
      </div>

      <CustomToastContainer />
    </div>
  );
};

export default CatersDetailsForm;
