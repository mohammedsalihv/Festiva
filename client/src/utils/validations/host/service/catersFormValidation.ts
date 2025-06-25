import {
  CatersFormState,
  CatersDetailsFormState,
} from "@/utils/Types/host/services/catersTypes";

export interface ValidationResult {
  isValid: boolean;
  errors: { [key: string]: string };
}

export const validateCatersForm = (form: CatersFormState): ValidationResult => {
  const errors: { [key: string]: string } = {};

  if (!form.catersName?.trim())
    errors.catersName = "Organization name is required";

  if (!form.charge.trim()) {
    errors.amount = "Total amount required";
  } else if (!/^\d+$/.test(form.charge.trim())) {
    errors.amount = "Only digits are allowed";
  }

  if (!form.manpower.trim()) {
    errors.manpower = "Manpower count required";
  } else if (!/^\d+$/.test(form.manpower.trim())) {
    errors.manpower = "Only digits are allowed";
  }

  if (form.availableDates?.length === 0) {
    errors.availableDates = "Please select at least one available date";
  }
  if (form.timeSlots?.length === 0) {
    errors.timeSlots = "Please select at least one time slot";
  }
  const isValid = Object.keys(errors).length === 0;

  return {
    isValid,
    errors,
  };
};

export const validateCatersDetailsForm = (
  form: CatersDetailsFormState
): ValidationResult => {
  const errors: { [key: string]: string } = {};

  if (!form.conditions?.trim())
    errors.conditions = "Terms and conditions required";

  if (!form.about.trim()) errors.about = "About your organization";
  
  if (!form.description?.trim())
    errors.description = "Please write something about your service";

  if (form.features?.length === 0) {
    errors.features = "Please select at least one available date";
  }

  const isValid = Object.keys(errors).length === 0;

  return {
    isValid,
    errors,
  };
};
