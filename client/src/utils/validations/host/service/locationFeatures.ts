export interface ValidationResult {
  isValid: boolean;
  errors: { [key: string]: string };
}

export interface LocationFeaturesErrorState {
  features: string[];
  parkingFeatures: string[];
  about: string;
  terms: string;
}

export interface LocationFeaturesState {
  features: string[];
  parkingFeatures: string[];
  about: string;
  terms: string;
}

export const validateLocationFeaturesForm = (
  form: LocationFeaturesState
): ValidationResult => {
  const errors: { [key: string]: string } = {};

  if (!form.about.trim()) errors.venueName = "About is required";

  if (!form.terms.trim()) errors.rent = "Your terms and conditions required";

  if (form.features.length === 0) {
    errors.availableDates = "Please include at least one feature";
  }
  if (form.parkingFeatures.length === 0) {
    errors.timeSlots = "Please add at least one parking feature";
  }
  const isValid = Object.keys(errors).length === 0;

  return {
    isValid,
    errors,
  };
};
