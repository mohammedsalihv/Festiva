// types.ts
export interface VenueDetails {
  name: string;
  rent: number;
  capacity: number;
  shift: string;
  squareFeet: number;
  timeSlots: string[];
  availableDates: string[];
  details: string;
}

export interface LocationDetails {
  houseNo: string;
  street: string;
  district: string;
  state: string;
  country: string;
  zip: string;
}

export interface croppedImages {
  croppedImages: string[];
}

export interface LocationFeatures {
  features: string[];
  parkingFeatures: string[];
  venueDescription: string;
  terms: string;
}
