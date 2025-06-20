import { Images } from "@/assets";
import { Checkbox } from "@/components/Checkbox";
import { Textarea } from "@/components/Textarea";
import React, { useState } from "react";
import { rentCarFeatures } from "@/utils/Options/host/rentcar/rentcarFeatures";
import {
  initialRentCarDetailsStates,
  rentCarDetailsFormErrorState,
  rentCarDetailsFormState,
} from "@/utils/validations/host/service/CarRentFormValidation";
import { Input } from "@/components/Input";

const CarFeatures: React.FC = () => {
  const [carFeatureForm, setCarFeatureForm] = useState<rentCarDetailsFormState>(
    initialRentCarDetailsStates
  );

  const [errors, setErrors] = useState<rentCarDetailsFormErrorState>(
    initialRentCarDetailsStates
  );

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

  return (
    <div className="max-w-7xl mx-auto px-3 sm:mt-16 py-8 font-prompt">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-black mb-1">
          Describe the features of the service
        </h2>
        <p className="text-sm sm:text-base text-gray-600 mb-6 font-JosephicSans">
          10 minuets to list your car from the comfort of your home & start
          earning!
        </p>
      </div>
      <div className="grid lg:grid-cols-[2fr_1fr] gap-8 items-start">
        <div className="flex flex-col gap-4 w-full md:w-1/2">
          <div className="flex flex-col gap-2 text-black text-sm font-JosephicSans">
            {rentCarFeatures.map((feature) => (
              <label key={feature} className="flex items-center gap-2">
                <Checkbox
                  checked={carFeatureForm.carFeatures.includes(feature)}
                  className={
                    errors.carFeatures?.length > 0
                      ? "border-red-600"
                      : "border-black"
                  }
                />
                {feature}
              </label>
            ))}
            <Input
              type="text"
              onChange={handleChange}
              placeholder="Enter a point"
              className="flex-1 p-2 border rounded"
            />
          </div>

          <Textarea
            className="border border-gray-300 rounded-md p-2 mt-2"
            onChange={handleChange}
          />

          <Textarea
            className="border border-gray-300 rounded-md p-2 mt-2"
            placeholder="inclusion"
            onChange={handleChange}
          />

          <Textarea
            className="border border-gray-300 rounded-md p-2"
            onChange={handleChange}
          />
        </div>
        <div className="border rounded-md px-14 p-8 w-full md:w-1/2 flex flex-col items-center justify-center text-center gap-8">
          <img
            src={Images.car_rent}
            alt="Service Icon"
            className="w-20 h-20 object-contain"
          />
          <p className="text-sm text-gray-500 max-w-xs">
            If your location is associated with more than one category, please
            select the one that fits best. When choosing a type, please select
            up to five types only.
          </p>
        </div>
      </div>
      <div className="w-full mt-4">
        <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-md float-right transition-colors duration-300">
          Next
        </button>
      </div>
    </div>
  );
};

export default CarFeatures;
