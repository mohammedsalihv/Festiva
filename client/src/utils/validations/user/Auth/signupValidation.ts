export interface ValidationResult {
  isValid: boolean;
  errors: { [key: string]: string };
}
export interface FormState {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

export const validateSignupForm = (form: FormState): ValidationResult => {
  const errors: { [key: string]: string } = {};

  if (!form.firstname.trim()) errors.firstname = "Firstname is required";
  if (!form.lastname.trim()) errors.lastname = "Lastname is required";
  if (!form.email.match(/^\S+@\S+\.\S+$/)) errors.email = "Invalid Email";
  if (!form.phone.match(/^[+()\-0-9]{10,20}$/)) {
    errors.phone =
      "Invalid phone number (only digits, spaces, and special characters like +, -, () allowed)";
  }
  if (!form.password.trim()) {
    errors.password = "Password is required";
  } else {
    if (form.password.length < 8) {
      errors.password = "Password must be at least 8 characters";
    } else if (
      !form.password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/)
    ) {
      errors.password =
        "Password must include uppercase, lowercase, number, and special character";
    }
  }
  if (!form.confirmPassword.trim()) {
    errors.confirmPassword = "Confirm Password is required";
  } else if (form.password !== form.confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
