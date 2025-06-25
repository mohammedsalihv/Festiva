export interface CatersFormErrorState {
  catersName: string;
  manpower: string;
  charge: string;
  totalAmount: string;
  timeSlots: string[];
  availableDates: string[];
}

export interface CatersFormState {
  catersName: string;
  manpower: string;
  charge: string;
  totalAmount: string;
  timeSlots: string[];
  availableDates: string[];
}

export const initialCatersFormState: CatersFormState = {
  catersName: "",
  manpower: "",
  charge: "",
  totalAmount: "",
  timeSlots: [],
  availableDates: [],
};

export interface CatersDetailsFormErrorState {
  features: string[];
  conditions?: string;
  about: string;
  description?: string;
}

export interface CatersDetailsFormState {
  features?: string[];
  conditions?: string;
  about: string;
  description?: string;
}

export const initialCatersDetailsFormState: CatersDetailsFormState = {
  conditions: "",
  about: "",
  description: "",
  features: [],
};
