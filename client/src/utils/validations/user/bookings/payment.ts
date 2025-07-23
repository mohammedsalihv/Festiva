export interface ValidationResult {
  isValid: boolean;
  errors: { [key: string]: string };
}

export interface userInformation {
  name: string;
  email: string;
  phone: string;
  address: string;
  landmark?: string;
  city: string;
  state: string;
  country: string;
}
