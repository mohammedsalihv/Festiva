import { studioDetailsFormState } from "@/utils/Types/host/services/studio/studioDetailsForm.types";


export interface ValidationResult {
  isValid: boolean;
  errors: { [key: string]: string };
}


export const validateStudioDetailsForm = (
  form: studioDetailsFormState
): ValidationResult => {
  const errors: { [key: string]: string } = {};

  if (!form.packages.length) {
    errors.packages = "Please add at least one package.";
  }

  if (!form.serviceFeatures.length) {
    errors.serviceFeatures = "Please select at least one feature.";
  }

  const isValid = Object.keys(errors).length === 0;

  return {
    isValid,
    errors,
  };
};
