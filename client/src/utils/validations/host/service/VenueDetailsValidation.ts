export interface ValidationResult {
  isValid: boolean;
  errors: { [key: string]: string };
}

export interface venueDetailsFormState {
  name: string;
  rent: number | null;
  capacity: number | null;
  shift: string;
  squareFeet: number | null;
  timeSlots: string[];
  availableDates: string[];
  details: string;
}

export const validateVenueDetailsForm = (
  form: venueDetailsFormState
): ValidationResult => {
  const errors: { [key: string]: string } = {};

  if (!form.name.trim()) errors.name = "Venue name is required";
  
  if (form.rent === null || form.rent <= 0) errors.rent = "Rent is required and should be a positive number";
  
  if (form.capacity === null || form.capacity <= 0) errors.capacity = "Capacity is required and should be a positive number";
  
  if (!form.shift) errors.shift = "Shift is required";
  
  if (form.squareFeet === null || form.squareFeet <= 0) errors.squareFeet = "Square feet is required and should be a positive number";
  
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
