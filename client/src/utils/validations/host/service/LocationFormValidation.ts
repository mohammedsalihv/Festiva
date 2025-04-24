export interface ValidationResult {
  isValid: boolean;
  errors: { [key: string]: string };
}

export interface locationFormState {
  houseNo: string;
  street: string;
  district: string;
  state: string;
  country: string;
  zip: string;
}

export const validateLocationForm = (form: locationFormState): ValidationResult => {
  const errors: { [key: string]: string } = {};

  if (!form.houseNo.trim()) errors.houseNo = "house no is required";
  if (!form.street.trim()) errors.street = "street is required";
  if (!form.district.trim()) errors.district = "district is required";
  if (!form.state.trim()) errors.state = "state is required";
  if (!form.country.trim()) errors.country = "country is required";
  if (!form.zip.trim()) errors.zip = "zip is required";

  const isValid = Object.keys(errors).length === 0;

  return {
    isValid,
    errors,
  };
};
