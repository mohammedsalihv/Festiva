import { useAppDispatch } from "@/redux/hooks";
import { useState } from "react";
import { Checkbox } from "@/components/Checkbox";
import CustomToastContainer from "@/reusable-components/messages/ToastContainer";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { studioServiceFeaturesOptions } from "@/utils/Options/host/studio/studioFeatures";
import { validateStudioDetailsForm } from "@/utils/validations/host/service/studio/studioDetailsFormValidation";
import {
  studioDetailsFormErrorState,
  studioDetailsFormState,
  initialStudioDetailsFormErrorState,
  initialStudioDetailsFormState,
} from "@/utils/Types/host/services/studio/studioDetailsForm.types";
import { packageState } from "@/utils/Types/host/services/studio/packageForm.types";
import { setStudioDetailsFormStates } from "@/redux/Slice/host/studio/studioSlice";
import Spinner from "@/components/Spinner";
import { MdAddToPhotos } from "react-icons/md";
import PackageForm from "@/reusable-components/host/PackageForm";
import { IoIosClose } from "react-icons/io";

const StudioDetailsForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [packageFormOpen, setPackageFormOpen] = useState(false);
  const [studioDetailsForm, setStudioDetailsForm] =
    useState<studioDetailsFormState>(initialStudioDetailsFormState);
  const [errors, setErrors] = useState<studioDetailsFormErrorState>(
    initialStudioDetailsFormErrorState
  );
  const [packages, setPackages] = useState<packageState[]>([]);

  const handleCheckbox = (
    checked: boolean | "indeterminate",
    id: string,
    type: "serviceFeatures"
  ) => {
    setStudioDetailsForm((prev) => {
      const updatedList = checked
        ? [...prev[type], id]
        : prev[type].filter((item) => item !== id);
      return { ...prev, [type]: updatedList };
    });

    if (errors[type]) {
      setErrors((prev) => ({ ...prev, [type]: "" }));
    }
  };

  const handleSavePackages = (pkg: packageState) => {
    setPackages((prev) => [...prev, pkg]);
    setPackageFormOpen(false);
  };

  const handleRemovePackage = (index: number) => {
    setPackages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleNext = () => {
    if (packages.length === 0) {
      toast.error("Please add at least one package.");
      return;
    }

    const { isValid, errors: validationErrors } = validateStudioDetailsForm({
      ...studioDetailsForm,
      packages,
    });

    if (!isValid) {
      setErrors({
        packages: validationErrors.packages || "",
        serviceFeatures: validationErrors.serviceFeatures || "",
      });

      toast.error("Please correct the errors in the form.");
      console.log(validationErrors);
      setTimeout(() => setErrors(initialStudioDetailsFormErrorState), 5000);
      return;
    }

    setLoading(true);
    dispatch(
      setStudioDetailsFormStates({
        ...studioDetailsForm,
        packages,
      })
    );

    toast.success("Saving...");
    setTimeout(() => navigate("/host/list/image-upload"), 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:mt-16 py-8 font-prompt relative">
      <h2 className="text-xl sm:text-2xl font-bold mb-4">
        What key features does your service have?
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {studioServiceFeaturesOptions.map((feature) => (
          <div key={feature} className="flex items-start gap-2 min-h-[40px]">
            <Checkbox
              id={feature}
              checked={studioDetailsForm.serviceFeatures.includes(feature)}
              onCheckedChange={(checked) =>
                handleCheckbox(checked, feature, "serviceFeatures")
              }
              className={
                errors.serviceFeatures ? "border-red-600" : "border-black"
              }
            />
            <label htmlFor={feature} className="text-sm">
              {feature}
            </label>
          </div>
        ))}
      </div>

      {errors.serviceFeatures && (
        <p className="text-red-600 text-xs mb-4">{errors.serviceFeatures}</p>
      )}

      <h2 className="text-xl sm:text-2xl font-bold mb-4">Your Packages</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {packages.map((pkg, idx) => (
          <div
            key={idx}
            className="relative border rounded-lg p-4 shadow bg-white flex flex-col justify-between"
          >
            <IoIosClose
              className="absolute top-2 right-2 text-red-500 hover:text-red-700 transition w-7 h-7 cursor-pointer hover:border"
              onClick={() => handleRemovePackage(idx)}
            />
            <div>
              <p className="text-sm mb-1 font-semibold p-1">
                Package name:
                <span className="text-sm font-normal text-gray-700">
                  {" "}
                  {pkg.packageName}
                </span>
              </p>
              <p className="text-sm mb-1 font-semibold p-1">
                Delivery time:
                <span className="text-sm font-normal text-gray-700">
                  {" "}
                  {pkg.deliveryTime}
                </span>
              </p>
              <p className="text-sm mb-1 font-semibold p-1">
                Validity:
                <span className="text-sm font-normal text-gray-700">
                  {" "}
                  {pkg.validity}
                </span>
              </p>
            </div>
            <div className="flex gap-4 mt-2">
              <div>
                <p className="text-sm mb-1 font-semibold p-1">Includes:</p>
                <ul className="list-disc list-inside text-xs text-gray-600">
                  {pkg.packageIncludes.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-sm mb-1 font-semibold p-1">Equipments:</p>
                <ul className="list-disc list-inside text-xs text-gray-600">
                  {pkg.equipments.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}

        <div
          onClick={() => setPackageFormOpen(true)}
          className="flex flex-col items-center justify-center px-2 py-4 text-center cursor-pointer hover:opacity-80 transition"
        >
          <MdAddToPhotos className="h-8 w-8 text-gray-600" />
          <p className="text-sm mt-2 text-gray-700">Add Package</p>
        </div>
      </div>

      {packageFormOpen && (
        <PackageForm
          formOpen={setPackageFormOpen}
          handleSavePackages={handleSavePackages}
        />
      )}

      <div className="flex justify-end mt-10">
        <button
          onClick={handleNext}
          disabled={loading}
          className={`flex items-center justify-center gap-2 bg-main_host text-white px-10 py-3 rounded-lg transition min-h-[48px] ${
            loading ? "opacity-70 cursor-not-allowed" : "hover:brightness-110"
          }`}
        >
          {loading ? <Spinner text="Saving..." /> : "Next"}
        </button>
        <CustomToastContainer />
      </div>
    </div>
  );
};

export default StudioDetailsForm;
