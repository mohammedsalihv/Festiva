export interface ValidationResult {
  isValid: boolean;
  errors: { [key: string]: string };
}

export interface rentCarFormErrorState {
  businessName?: string;
  carName?: string;
  make?: string;
  model?: string;
  color?: string;
  fuel?: string;
  transmission?: string;
  seats?: string;
  rent?: string;
  deposite?: string;
  timeSlots?: string[];
  availableDates?: string[];
}

export interface rentCarFormState {
  businessName: string;
  carName: string;
  rent: string;
  make: string;
  model: string;
  timeSlots: string[];
  availableDates: string[];
  color: string;
  fuel: string;
  transmission: string;
  seats: string;
  deposite: string;
}

export const initialRentCarStates: rentCarFormState = {
  businessName: "",
  carName: "",
  make: "",
  model: "",
  color: "",
  fuel: "",
  transmission: "",
  seats: "",
  rent: "",
  deposite: "",
  timeSlots: [],
  availableDates: [],
};

export const validateRentCarForm = (
  form: rentCarFormState
): ValidationResult => {
  const errors: { [key: string]: string } = {};

  if (!form.businessName.trim())
    errors.businessName = "Your business name is required";
  if (!form.make.trim()) errors.make = "Make is required";
  if (!form.model.trim()) errors.model = "Model is required";
  if (!form.rent.trim())
    errors.rent = "Rent is required and should be a positive number";
  if (!form.seats.trim()) errors.seats = "Please select at least one seat";
  if (!form.transmission) errors.transmission = "Transmission is required";
  if (!form.carName.trim()) errors.carName = "Car name is required";
  if (!form.deposite.trim()) errors.deposite = "Deposit amount is required";
  if (!form.color.trim()) errors.color = "Please type your car color";
  if (!form.fuel.trim())
    errors.fuel = "Please select at least one available fuel type";
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

export interface rentCarDetailsFormErrorState {
  carFeatures: string[];
  additionalFeatures: string[];
  termsOfUse: string[];
  about?: string;
  description?: string;
  guidelines: string;
  userDocument: string;
}

export interface rentCarDetailsFormState {
  carFeatures: string[];
  additionalFeatures: string[];
  termsOfUse: string[];
  about?: string;
  description?: string;
  guidelines: string;
  userDocument: string;
}

export const initialRentCarDetailsStates: rentCarDetailsFormState = {
  carFeatures: [],
  additionalFeatures: [],
  termsOfUse: [],
  about: "",
  description: "",
  guidelines: "",
  userDocument: "",
};

export const initialRentCarDetailsErrorState: rentCarDetailsFormErrorState = {
  carFeatures: [],
  additionalFeatures: [],
  termsOfUse: [],
  about: "",
  description: "",
  guidelines: "",
  userDocument: "",
};

export const validateRentCarFeaturesForm = (
  form: rentCarDetailsFormState
): ValidationResult => {
  const errors: { [key: string]: string } = {};

  if (!form.userDocument.trim()) errors.userDocument = "Select one document";
  if (!form.guidelines.trim())
    errors.guidelines = "Try to include how to use it.";
  if (!form.description?.trim()) errors.description = "Description required";
  if (!form.about?.trim()) errors.about = "Share about your firm";
  if (form.carFeatures.length === 0) {
    errors.carFeatures = "Please select at least one feature";
  }
  if (form.termsOfUse.length === 0) {
    errors.termsOfUse = "Please share the terms of using the car";
  }

  const isValid = Object.keys(errors).length === 0;

  return {
    isValid,
    errors,
  };
};
