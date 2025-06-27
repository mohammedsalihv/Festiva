export interface catersFormErrorState {
  catersName?: string;
  manpower?: string;
  charge?: string;
  totalAmount?: string;
  timeSlots?: string;
  availableDates?: string;
}

export interface catersFormState {
  catersName: string;
  manpower: string;
  charge: string;
  totalAmount: string;
  timeSlots: string[];
  availableDates: string[];
}

export const initialCatersFormState: catersFormState = {
  catersName: "",
  manpower: "",
  charge: "",
  totalAmount: "",
  timeSlots: [],
  availableDates: [],
};

export interface catersDetailsFormErrorState {
  features: string[];
  serviceTypes: string[];
  conditions?: string;
  about?: string;
  description?: string;
}

export interface catersDetailsFormState {
  features: string[];
  serviceTypes: string[];
  conditions: string;
  about: string;
  description: string;
}

export const initialCatersDetailsFormState: catersDetailsFormState = {
  conditions: "",
  about: "",
  description: "",
  serviceTypes: [],
  features: [],
};
