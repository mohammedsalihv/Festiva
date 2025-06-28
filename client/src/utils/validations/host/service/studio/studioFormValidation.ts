import { studioFormState} from "@/utils/Types/host/services/studio/studioForm.types";

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
