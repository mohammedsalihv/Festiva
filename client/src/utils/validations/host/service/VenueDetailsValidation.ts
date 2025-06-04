export interface ValidationResult {
  isValid: boolean;
  errors: { [key: string]: string };
}

export interface venueDetailsFormState {
  venueName: string;
  rent: string;
  capacity: string;
  shift: string;
  squareFeet: string;
  timeSlots: string[];
  availableDates: string[];
  details: string;
}

export const validateVenueDetailsForm = (
  form: venueDetailsFormState
): ValidationResult => {
  const errors: { [key: string]: string } = {};

  if (!form.venueName.trim()) errors.name = "Venue name is required";
  
  if (form.rent === null) errors.rent = "Rent is required and should be a positive number";
  
  if (form.capacity === null) errors.capacity = "Capacity is required and should be a positive number";
  
  if (!form.shift) errors.shift = "Shift is required";
  
  if (form.squareFeet === null) errors.squareFeet = "Square feet is required and should be a positive number";
  
  if (!form.details.trim()) errors.details = "Please write something about the venue";

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
