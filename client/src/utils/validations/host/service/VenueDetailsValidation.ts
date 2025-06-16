export interface ValidationResult {
  isValid: boolean;
  errors: { [key: string]: string };
}


export interface VenueDetailsErrorState {
  venueName?: string;
  rent?: string;
  capacity?: string;
  shift?: string;
  squareFeet?: string;
  timeSlots?: string[];
  availableDates?: string[];
  description?: string;
}

export interface venueDetailsFormState {
  venueName: string;
  rent: string;
  capacity: string;
  shift: string;
  squareFeet: string;
  timeSlots: string[];
  availableDates: string[];
  description: string;
}

export const validateVenueDetailsForm = (
  form: venueDetailsFormState
): ValidationResult => {
  const errors: { [key: string]: string } = {};

  if (!form.venueName.trim()) errors.venueName = "Venue name is required";
  
  if (!form.rent.trim()) errors.rent = "Rent is required";
  
  if (!form.capacity.trim()) errors.capacity = "Capacity is required";
  
  if (!form.shift) errors.shift = "Shift is required";
  
  if (!form.squareFeet.trim()) errors.squareFeet = "Square feet is required";
  
  if (!form.description.trim()) errors.description = "Please write something about the venue";

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
