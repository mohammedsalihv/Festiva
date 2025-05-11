export interface ValidationResult {
  isValid: boolean;
  errors: { [key: string]: string };
}

interface AdminUserState {
    firstname: string;
    lastname: string;
    phone: string;
    role: string;
    isActive: boolean;
    isBlocked: boolean;
  }
  
export interface SelectedUser {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  role: string;
  timestamp: string;
  isBlocked: boolean;
  isActive: boolean;
}

export const validateAdminEditUserForm = (form: AdminUserState): ValidationResult => {
    const errors: { [key: string]: string } = {};

    if (!form.firstname.trim()) errors.firstname = "Firstname is required";
    if (!form.lastname.trim()) errors.lastname = "Lastname is required";
    if (!form.phone.trim() && !form.phone.match(/^\+?\d{10,15}$/)) {
      errors.phone = "Invalid Phone Number";
    }
    if (!form.role || form.role === "Select") errors.role = "Role is required";
    if (typeof form.isBlocked !== "boolean") {
      errors.isBlocked = "Block status is required";
    }
    if (typeof form.isActive !== "boolean") {
      errors.isActive = "Account status is required";
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  };