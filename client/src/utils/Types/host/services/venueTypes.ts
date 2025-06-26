export interface addVenueData {
  venueName?: string;
  rent?: string;
  capacity?: string;
  shift?: string;
  squareFeet?: string;
  timeSlots?: string[];
  availableDates?: string[];
  details?: string;
  features: string[];
  parkingFeatures: string[];
  description: string;
  terms: string;
  Images: File[];
  location: object;
}

export interface venueFormState {
  venueName: string;
  rent: string;
  capacity: string;
  shift: string;
  squareFeet: string;
  timeSlots: string[];
  availableDates: string[];
  description: string;
}

export interface VenueFormErrorState {
  venueName?: string;
  rent?: string;
  capacity?: string;
  shift?: string;
  squareFeet?: string;
  timeSlots?: string[];
  availableDates?: string[];
  description?: string;
}

export const venueFormInitialState: venueFormState = {
  venueName: "",
  rent: "",
  capacity: "",
  shift: "",
  squareFeet: "",
  timeSlots: [],
  availableDates: [],
  description: "",
};

export interface venueDetailsFormState {
  features: string[];
  parkingFeatures: string[];
  about: string;
  terms: string;
}

export const venueDetailsFormInitialState: venueDetailsFormState = {
  features: [],
  parkingFeatures: [],
  about: "",
  terms: "",
};

export interface venueDetailsFormErrorState {
  features: string[];
  parkingFeatures: string[];
  about: string;
  terms: string;
}
