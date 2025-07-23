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

export const validateUserInformation = (form: userInformation) => {
  const errors: { [key: string]: string } = {};

  // Name: required and minimum 2 characters
  if (!form.name.trim()) {
    errors.name = "Name is required.";
  } else if (form.name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters.";
  }

  // Email: basic regex validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!form.email.trim()) {
    errors.email = "Email is required.";
  } else if (!emailRegex.test(form.email)) {
    errors.email = "Invalid email address.";
  }

  // Phone: digits only, 10 to 15 characters
  const phoneRegex = /^\d{10,15}$/;
  if (!form.phone.trim()) {
    errors.phone = "Phone number is required.";
  } else if (!phoneRegex.test(form.phone)) {
    errors.phone = "Invalid phone number.";
  }

  // Address
  if (!form.address.trim()) {
    errors.address = "Address is required.";
  }

  // City
  if (!form.city.trim()) {
    errors.city = "City is required.";
  }

  // State
  if (!form.state.trim()) {
    errors.state = "State is required.";
  }

  // Country
  if (!form.country.trim()) {
    errors.country = "Country is required.";
  }


  return errors;
};


export interface cardInformation {
  cardNumber: string;
  expiryDate: string; 
  cvc: string;
  nameOfCardHolder: string;
}

export const validateCard = (form: cardInformation) => {
  const errors: { [key: string]: string } = {};

  // Card Number: Should be 13-19 digits
  const cardRegex = /^\d{13,19}$/;
  if (!cardRegex.test(form.cardNumber)) {
    errors.cardNumber = "Invalid card number.";
  }

  // Expiry Date: MM/YY format and must be a future date
  const [month, year] = form.expiryDate.split("/").map(Number);
  if (
    !month || !year ||
    month < 1 || month > 12 ||
    new Date(Number(`20${year}`), month - 1) < new Date()
  ) {
    errors.expiryDate = "Invalid or expired expiry date.";
  }

  // CVC: 3 or 4 digits
  const cvcRegex = /^\d{3,4}$/;
  if (!cvcRegex.test(form.cvc)) {
    errors.cvc = "Invalid CVC.";
  }

  // Card Holder Name
  if (!form.nameOfCardHolder.trim()) {
    errors.nameOfCardHolder = "Card holder name is required.";
  }

  return errors;
};
