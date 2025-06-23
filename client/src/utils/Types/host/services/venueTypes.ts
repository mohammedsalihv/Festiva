export interface AddVenueData {
  venueName?: string;
  rent?: number | null;
  capacity?: number | null;
  shift?: string;
  squareFeet?: number | null;
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

export interface VenueDetails {
  venueName: string;
  rent: number | null;
  capacity: number | null;
  shift: string;
  squareFeet: number | null;
  timeSlots: string[];
  availableDates: string[];
  description: string;
}

export const venueDetailsInitialState: VenueDetails = {
  venueName: "",
  rent: null,
  capacity: null,
  shift: "",
  squareFeet: null,
  timeSlots: [],
  availableDates: [],
  description: "",
};

export interface venueFeatures {
  features: string[];
  parkingFeatures: string[];
  about: string;
  terms: string;
}

export const venueFeaturesInitialState: venueFeatures = {
  features: [],
  parkingFeatures: [],
  about: "",
  terms: "",
};

export interface LocationDetails {
  houseNo: string;
  street: string;
  district: string;
  state: string;
  country: string;
  zip: string;
}

export interface ImageDetails {
  Images: File[];
}
