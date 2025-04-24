export interface ValidationResult {
  isValid: boolean;
  errors: { [key: string]: string };
}
export interface FormState {
  name: string;
  email: string;
  phone: string;
  password: string;
  location: string;
}

export const validateHostRegisterForm = (form: FormState): ValidationResult => {
  const errors: { [key: string]: string } = {};

  if (!form.name.trim()) errors.name = "Name is required";
  if (!form.email.match(/^\S+@\S+\.\S+$/)) errors.email = "Email required";
  if (!form.phone.match(/^\+?\d{10,15}$/))
    errors.phone = "Invalid Phone Number";
  if (!form.password.trim()) errors.password = "Password is required";
  if (!form.location.trim()) errors.location = "Location is required";
  if (form.password.length < 6)
    errors.password = "Password must be at least 6 characters";

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
