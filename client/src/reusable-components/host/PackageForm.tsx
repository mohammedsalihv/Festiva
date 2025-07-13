import { Input } from "@/components/Input";
import { useState } from "react";
import { validatePackageForm } from "@/utils/validations/host/service/packageFormValidation";
import {
  packageFormErrorState,
  packageFormState,
  initialPackageFormErrorState,
  initialPackageFormState,
} from "@/utils/Types/host/services/studio/packageForm.types";
import { Button } from "@/components/Button";
import Spinner from "@/components/Spinner";
import { IoMdArrowDropright } from "react-icons/io";

interface packagesProps {
  formOpen: (value: boolean) => void;
  handleSavePackages: (pkg: packageFormState["packages"][0]) => void;
}

const PackageForm = ({ formOpen, handleSavePackages }: packagesProps) => {
  const [packageForm, setPackageForm] = useState<packageFormState>(
    initialPackageFormState
  );
  const [errors, setErrors] = useState<packageFormErrorState>(
    initialPackageFormErrorState
  );
  const [loading, setLoading] = useState(false);
  const [equipmentInput, setEquipmentInput] = useState("");
  const [packgeIncludesInput, setPackgeIncludesInput] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name as keyof packageFormState["packages"][0];
    const value = e.target.value;

    setPackageForm((prev) => ({
      ...prev,
      packages: [{ ...prev.packages[0], [name]: value }],
    }));

    if (errors.packages[0][name]) {
      setErrors((prev) => ({
        ...prev,
        packages: [{ ...prev.packages[0], [name]: "" }],
      }));
    }
  };

  const handleAdd = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const trimmedEquip = equipmentInput.trim();
    const trimmedInclude = packgeIncludesInput.trim();

    if (trimmedEquip)
      setPackageForm((prev) => ({
        ...prev,
        packages: [
          {
            ...prev.packages[0],
            equipments: [...prev.packages[0].equipments, trimmedEquip],
          },
        ],
      }));

    if (trimmedInclude)
      setPackageForm((prev) => ({
        ...prev,
        packages: [
          {
            ...prev.packages[0],
            packageIncludes: [
              ...prev.packages[0].packageIncludes,
              trimmedInclude,
            ],
          },
        ],
      }));

    setEquipmentInput("");
    setPackgeIncludesInput("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { isValid, errors: validationErrors } =
      validatePackageForm(packageForm);

    if (!isValid) {
      setErrors(validationErrors);
      setTimeout(() => setErrors(initialPackageFormErrorState), 5000);
      setLoading(false);
      return;
    }

    handleSavePackages(packageForm.packages[0]);
    setLoading(false);
    formOpen(false);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center font-poppins"
      role="dialog"
      aria-modal="true"
    >
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-xl w-full max-w-3xl space-y-4 overflow-y-auto max-h-[90vh]"
      >
        <h2 className="text-lg font-bold">Add a Package</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block mb-1 font-medium text-sm">
              Package name
            </label>
            <Input
              name="packageName"
              value={packageForm.packages[0].packageName}
              onChange={handleInputChange}
              className={
                errors.packages[0].packageName
                  ? "border-red-600"
                  : "border-black"
              }
            />
            {errors.packages[0].packageName && (
              <p className="text-red-600 text-xs mt-1">
                {errors.packages[0].packageName}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium text-sm">Manpower</label>
            <Input
              name="manPower"
              value={packageForm.packages[0].manPower}
              onChange={handleInputChange}
              className={
                errors.packages[0].manPower ? "border-red-600" : "border-black"
              }
            />
            {errors && (
              <p className="text-red-600 text-xs mt-1">
                {errors.packages[0].manPower}
              </p>
            )}
          </div>
        </div>

        <div>
          <label className="block mb-1 font-medium text-sm">Payment</label>
          <Input
            name="payment"
            value={packageForm.packages[0].payment}
            onChange={handleInputChange}
            className={
              errors.packages[0].payment ? "border-red-600" : "border-black"
            }
          />
          {errors.packages[0].payment && (
            <p className="text-red-600 text-xs mt-1">
              {errors.packages[0].payment}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block mb-1 font-medium text-sm">
              Delivery time
            </label>
            <Input
              name="deliveryTime"
              value={packageForm.packages[0].deliveryTime}
              onChange={handleInputChange}
              className={
                errors.packages[0].deliveryTime
                  ? "border-red-600"
                  : "border-black"
              }
            />
            {errors.packages[0].deliveryTime && (
              <p className="text-red-600 text-xs mt-1">
                {errors.packages[0].deliveryTime}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium text-sm">Validity</label>
            <Input
              name="validity"
              value={packageForm.packages[0].validity}
              onChange={handleInputChange}
              className={
                errors.packages[0].validity ? "border-red-600" : "border-black"
              }
            />
            {errors.packages[0].validity && (
              <p className="text-red-600 text-xs mt-1">
                {errors.packages[0].validity}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block mb-1 font-medium text-sm">
              Packages Includes
            </label>
            <div className="flex gap-2 items-center">
              <Input
                value={packgeIncludesInput}
                onChange={(e) => setPackgeIncludesInput(e.target.value)}
                placeholder="Enter feature..."
                className="flex-1"
              />
              <Button
                onClick={handleAdd}
                className="bg-black text-white hover:bg-gray-800"
              >
                Add
              </Button>
            </div>
            {errors.packages[0].packageIncludes && (
              <p className="text-red-600 text-xs mt-1">
                {errors.packages[0].packageIncludes}
              </p>
            )}
            <ul className="text-sm max-h-40 overflow-y-auto space-y-2 mt-2">
              {packageForm.packages[0].packageIncludes.map((term, idx) => (
                <li
                  key={idx}
                  className="flex justify-between items-center bg-gray-50 px-3 py-1 rounded hover:bg-gray-100 transition"
                >
                  <span className="flex items-center gap-2 text-gray-800">
                    <IoMdArrowDropright className="text-gray-600" />
                    {term}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      setPackageForm((prev) => ({
                        ...prev,
                        packages: [
                          {
                            ...prev.packages[0],
                            packageIncludes:
                              prev.packages[0].packageIncludes.filter(
                                (_, i) => i !== idx
                              ),
                          },
                        ],
                      }))
                    }
                    className="text-red-600 text-xs hover:underline"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <label className="block mb-1 font-medium text-sm">Equipments</label>
            <div className="flex gap-2 items-center">
              <Input
                value={equipmentInput}
                onChange={(e) => setEquipmentInput(e.target.value)}
                placeholder="Enter equipment..."
                className="flex-1"
              />
              <Button
                onClick={handleAdd}
                className="bg-black text-white hover:bg-gray-800"
              >
                Add
              </Button>
            </div>
            {errors && (
              <p className="text-red-600 text-xs mt-1">
                {errors.packages[0].equipments}
              </p>
            )}
            <ul className="text-sm max-h-40 overflow-y-auto space-y-2 mt-2">
              {packageForm.packages[0].equipments.map((term, idx) => (
                <li
                  key={idx}
                  className="flex justify-between items-center bg-gray-50 px-3 py-1 rounded hover:bg-gray-100 transition"
                >
                  <span className="flex items-center gap-2 text-gray-800">
                    <IoMdArrowDropright className="text-gray-600" />
                    {term}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      setPackageForm((prev) => ({
                        ...prev,
                        packages: [
                          {
                            ...prev.packages[0],
                            equipments: prev.packages[0].equipments.filter(
                              (_, i) => i !== idx
                            ),
                          },
                        ],
                      }))
                    }
                    className="text-red-600 text-xs hover:underline"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Button
            type="button"
            onClick={() => formOpen(false)}
            className="bg-blue-700 text-white  border shadow-lg"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="border border-gray-900 hover:bg-black hover:text-white"
          >
            {loading ? <Spinner text="Adding..." /> : "Add Package"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PackageForm;
