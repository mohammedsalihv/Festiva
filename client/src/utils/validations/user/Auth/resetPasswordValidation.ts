import { resetPasswordState } from "@/utils/Types/user/profileTypes";

export interface ValidationResult {
  isValid: boolean;
  errors: { [key: string]: string };
}

export const validateResetPasswordForm = (
  form: resetPasswordState
): ValidationResult => {
  const errors: { [key: string]: string } = {};

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
  if (!form.confirmPassword.trim()) {
    errors.confirmPassword = "Confirm password is required";
  } else if (form.newPassword !== form.confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
