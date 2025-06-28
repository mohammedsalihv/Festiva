import React, { useState } from "react";
import { Checkbox } from "@/components/Checkbox";
import { Textarea } from "@/components/Textarea";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import {
  rentCarFeatures,
  rentCarAdditionalFeatures,
} from "@/utils/Options/host/rentcar/rentcarFeatures";
import {
  initialRentCarDetailsStates,
  rentCarDetailsFormErrorState,
  rentCarDetailsFormState,
  initialRentCarDetailsErrorState,
  validateRentCarFeaturesForm,
} from "@/utils/validations/host/service/rentCarFormValidation";
import { IoMdArrowDropright } from "react-icons/io";
import Spinner from "@/components/Spinner";
import CustomToastContainer from "@/reusable-components/Messages/ToastContainer";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setRentCarDetails } from "@/redux/Slice/host/rentcar/rentCarSlice";

const RentCarDetailsForm: React.FC = () => {
  const [carFeatureForm, setCarFeatureForm] = useState<rentCarDetailsFormState>(
    initialRentCarDetailsStates
  );
  const [errors, setErrors] = useState<rentCarDetailsFormErrorState>(
    initialRentCarDetailsErrorState
  );
  const [termInput, setTermInput] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setCarFeatureForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleCheckBox = (
    checked: boolean | "indeterminate",
    id: string,
    type: "carFeatures" | "additionalFeatures"
  ) => {
    setCarFeatureForm((prev) => {
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

  const handleAddTerm = () => {
    const trimmed = termInput.trim();

    if (trimmed) {
      setCarFeatureForm((prev) => ({
        ...prev,
        termsOfUse: [...prev.termsOfUse, trimmed],
      }));
      setTermInput("");
    }

    if (errors.termsOfUse?.length) {
      setErrors((prev) => ({ ...prev, termsOfUse: [] }));
    }
  };

  const handleSubmit = () => {
    setLoading(true);

    const { isValid, errors: validationErrors } =
      validateRentCarFeaturesForm(carFeatureForm);

    if (!isValid) {
      setErrors({
        carFeatures: validationErrors.carFeatures
          ? [validationErrors.carFeatures]
          : [],
        additionalFeatures: validationErrors.additionalFeatures
          ? [validationErrors.additionalFeatures]
          : [],
        termsOfUse: validationErrors.termsOfUse
          ? [validationErrors.termsOfUse]
          : [],
        about: validationErrors.about ?? "",
        description: validationErrors.description ?? "",
        guidelines: validationErrors.guidelines ?? "",
        userDocument: validationErrors.userDocument ?? "",
      });
      toast.error("Please correct the errors in the form.");
      setTimeout(() => setErrors(initialRentCarDetailsErrorState), 5000);
      setLoading(false);
      return;
    }

    dispatch(setRentCarDetails(carFeatureForm));
    toast.success("Saving...");
    setTimeout(() => navigate("/host/list/image-upload"), 5000);
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:mt-16 py-8 font-prompt">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-black mb-1">
          Describe the features of the service
        </h2>
        <p className="text-sm sm:text-base text-gray-600 mb-6 font-JosephicSans">
          10 minutes to list your car from the comfort of your home & start
          earning!
        </p>
      </div>

      <div className="grid lg:grid-cols-[2fr_1fr] gap-8 items-start px-2">
        <div className="flex flex-col gap-4 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 text-black text-sm px-2">
            <div className="flex flex-col gap-2 text-black text-sm">
              <label className="font-semibold text-sm mb-2">
                Select your car features
              </label>
              {rentCarFeatures.map((feature) => (
                <label key={feature} className="flex items-center gap-2">
                  <Checkbox
                    checked={carFeatureForm.carFeatures.includes(feature)}
                    onCheckedChange={(checked) =>
                      handleCheckBox(checked, feature, "carFeatures")
                    }
                    className={
                      errors.additionalFeatures?.length > 0
                        ? "border-red-600"
                        : "border-black"
                    }
                  />
                  {feature}
                </label>
              ))}
              {errors.carFeatures && (
                <p className="text-red-600 text-xs mt-1">
                  {errors.carFeatures}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2 text-black text-sm">
              <label className="font-semibold text-sm mb-2">
                Additional features
              </label>
              {rentCarAdditionalFeatures.map((feature) => (
                <label key={feature} className="flex items-center gap-2">
                  <Checkbox
                    checked={carFeatureForm.additionalFeatures.includes(
                      feature
                    )}
                    onCheckedChange={(checked) =>
                      handleCheckBox(checked, feature, "additionalFeatures")
                    }
                    className={
                      errors.additionalFeatures?.length > 0
                        ? "border-red-600"
                        : "border-black"
                    }
                  />
                  {feature}
                </label>
              ))}
              {errors.additionalFeatures && (
                <p className="text-red-600 text-xs mt-1">
                  {errors.additionalFeatures}
                </p>
              )}
            </div>
          </div>
          <div>
            <label className="block mb-1 font-semibold text-sm mt-4">
              Document required
            </label>
            <select
              name="userDocument"
              onChange={handleChange}
              className={`w-full border-b rounded px-3 py-2 ${
                errors.userDocument ? "border-red-600" : "border-black"
              }`}
            >
              <option value="">Select one</option>
              <option value="Identity card">Identity card</option>
              <option value="Licence">Driving Licence</option>
              <option value="Adhar card">Adhar Card</option>
              <option value="Passport">Passport</option>
            </select>
            {errors.userDocument && (
              <p className="text-red-600 text-xs mt-1">{errors.userDocument}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-semibold text-sm mt-4">
              About
            </label>
            <Textarea
              name="about"
              className={`${
                errors.about ? "border-red-600" : "border-black"
              } p-2 mt-2`}
              onChange={handleChange}
            />
            {errors.about && (
              <p className="text-red-600 text-xs mt-1">{errors.about}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-semibold text-sm mt-4">
              Description
            </label>
            <Textarea
              name="description"
              className={`${
                errors.description ? "border-red-600" : "border-black"
              } p-2 mt-2`}
              onChange={handleChange}
            />
            {errors.description && (
              <p className="text-red-600 text-xs mt-1">{errors.description}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-semibold text-sm mt-4">
              Guidelines
            </label>
            <Textarea
              className={`${
                errors.guidelines ? "border-red-600" : "border-black"
              } p-2 mt-2`}
              name="guidelines"
              onChange={handleChange}
            />
            {errors.guidelines && (
              <p className="text-red-600 text-xs mt-1">{errors.guidelines}</p>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-4 w-full mb-8 sm:mb-0">
          <label className="block mb-1 font-semibold text-sm mt-4">
            Terms of use
          </label>
          <div className="flex items-center gap-2">
            <Input
              type="text"
              className={`${
                errors.termsOfUse && errors.termsOfUse.length > 0
                  ? "border-red-600"
                  : "border-black"
              }  flex-1 p-2 mt-2`}
              value={termInput}
              onChange={(e) => setTermInput(e.target.value)}
              placeholder="Enter your term one by one..."
            />
            <Button
              className="bg-black text-white hover:bg-gray-800 hover:text-white"
              onClick={handleAddTerm}
            >
              Add
            </Button>
          </div>
          {errors.termsOfUse && (
            <p className="text-red-600 text-xs">{errors.termsOfUse}</p>
          )}
          {carFeatureForm.termsOfUse.length > 0 && (
            <ul className="list-disc mt-2 ml-5 text-sm text-black max-h-40 overflow-y-auto pr-2 border p-2 rounded-lg">
              {carFeatureForm.termsOfUse.map((term, idx) => (
                <li
                  key={idx}
                  className="flex items-center justify-between gap-2 p-1"
                >
                  <span className="flex items-center gap-1">
                    <IoMdArrowDropright />
                    {term}
                  </span>
                  <button
                    onClick={() =>
                      setCarFeatureForm((prev) => ({
                        ...prev,
                        termsOfUse: prev.termsOfUse.filter((_, i) => i !== idx),
                      }))
                    }
                    className="text-red-600 text-xs hover:underline"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className="w-full mt-6 flex justify-end">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-md transition-colors duration-300 flex items-center justify-center gap-2"
        >
          {loading ? <Spinner text="Saving..." /> : "Next"}
        </button>
      </div>
      <CustomToastContainer />
    </div>
  );
};

export default RentCarDetailsForm;
