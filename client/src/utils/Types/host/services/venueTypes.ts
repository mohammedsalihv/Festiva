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

export interface LocationFeatures {
  features: string[];
  parkingFeatures: string[];
  about: string;
  terms: string;
}