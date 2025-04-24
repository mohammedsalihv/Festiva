export interface ValidationResult {
  isValid: boolean;
  errors: { [key: string]: string };
}

export interface carRentFormState {
  businessName: string;
  rent: number | null;
  make: string;
  model: string;
  timeSlots: string[];
  availableDates: string[];
  year: number | null;
  plate: string;
  color: string;
  fuel: string;
  transmission: string;
  seats: number | null;
  deposite: number | null;
}

export const validateCarRentForm = (
  form: carRentFormState
): ValidationResult => {
  const errors: { [key: string]: string } = {};

  if (!form.businessName.trim()) errors.businessName = "Your business name is required";
  if (!form.make.trim()) errors.make = "Make is required";
  if (!form.model.trim()) errors.model = "Model is required";
  if (form.rent === null || form.rent <= 0)
    errors.rent = "Rent is required and should be a positive number";
  if (form.seats === null || form.seats <= 0)
    errors.seats = "Please select at least one seat";
  if (!form.transmission) errors.transmission = "Transmission is required";
  if (form.year === null || form.year <= 0)
    errors.year = "Year is required and should be a positive number";
  if (form.deposite === null || form.deposite <= 0)
    errors.deposite = "Deposit amount is required";
  if (!form.color.trim()) errors.color = "Please type your car color";
  if (!form.plate.trim())
    errors.plate =
      "Please share your vehicle number plate. NB: it will never be disclosed to anyone, just for validation purposes";
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
