import { changePasswordState } from "@/utils/Types/user/profileTypes";

export interface ValidationResult {
  isValid: boolean;
  errors: { [key: string]: string };
}

export const validateChangePasswordForm = (
  form: changePasswordState
): ValidationResult => {
  const errors: { [key: string]: string } = {};

  
  if (!form.currentPassword.trim()) {
    errors.currentPassword = "Current password is required";
  } 
  if (!form.newPassword.trim()) {
    errors.newPassword = "New password is required";
  } else {
    if (form.newPassword.length < 8) {
      errors.newPassword = "Password must be at least 8 characters";
    } else if (
      !form.newPassword.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/)
    ) {
      errors.newPassword = "Password must include A–Z, a–z, 0–9, and @$%#&*";
    }
  }
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
