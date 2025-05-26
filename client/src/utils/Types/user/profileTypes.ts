export interface profileModify {
  firstname?: string;
  lastname?: string;
  email?: string;
  phone?: string;
}


export interface changePasswordState {
  currentPassword: string;
  newPassword: string;
}

export interface changePasswordErrorState {
  currentPassword?: string;
  newPassword?: string;
}

export interface resetPasswordErrorState {
  newPassword?: string;
  confirmPassword?:string
}

export interface resetPasswordState {
  email:string;
  newPassword: string;
  confirmPassword:string
}

export interface resetPaswordPayload {
  email:string;
  newPassword: string;
}