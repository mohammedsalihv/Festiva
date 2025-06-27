import {
  studioFormState,
  studioPackageState,
} from "@/utils/Types/host/services/studioTypess";

export interface ValidationResult {
  isValid: boolean;
  errors: { [key: string]: string };
}

export const validateStudioForm = (form: studioFormState): ValidationResult => {
  const errors: { [key: string]: string } = {};

  if (!form.studioName.trim())
    errors.studioName = "Organization name is required";
  if (!form.about.trim()) errors.about = "Tell about your business";
  if (!form.terms.trim()) errors.terms = "Terms & Conditions required";
  if (!form.description.trim()) errors.description = "Share about your service";

  if (form.availableDates.length === 0) {
    errors.availableDates = "Please select at least one available date";
  }
  if (form.timeSlots.length === 0) {
    errors.timeSlots = "Please select at least one time slot";
  }
  const isValid = Object.keys(errors).length === 0;

  return {
    isValid,
    errors,
  };
};

export const validateStudioPackageForm = (
  packages: studioPackageState
): ValidationResult => {
  const errors: { [key: string]: string } = {};

  if (packages.serviceFeatures.length === 0) {
    errors.availableDates = "Add at least one feature";
  }

  if (!packages || packages.packages.length === 0) {
    errors.packages = "At least one package is required";
  } else {
    packages.packages.forEach((pkg, index) => {
      if (!pkg.packageName?.trim()) {
        errors[`packages[${index}].packageName`] = "Package name is required";
      }
      if (!pkg.payment?.trim()) {
        errors[`packages[${index}].payment`] =
          "Payment information is required";
      }
      if (!pkg.manPower?.trim()) {
        errors[`packages[${index}].manPower`] = "Manpower details are required";
      }
      if (!pkg.equipments?.trim()) {
        errors[`packages[${index}].equipments`] = "Equipments info is required";
      }
      if (!pkg.deliveryTime?.trim()) {
        errors[`packages[${index}].deliveryTime`] = "Delivery time is required";
      }
      if (!pkg.validity?.trim()) {
        errors[`packages[${index}].validity`] = "Validity is required";
      }
    });
  }

  const isValid = Object.keys(errors).length === 0;

  return { isValid, errors };
};
