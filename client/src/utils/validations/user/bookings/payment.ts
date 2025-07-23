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

export interface cardInformation {
  cardNumber: number;
  expiryDate: Date;
  cvc: number;
  nameOfCardHolder: string;
}

export const validateCard = (form: cardInformation) => {
  const errors: { [key: string]: string } = {};
  if(!form.cardNumber < 8) errors.cardNumber = "Card number is "
};
