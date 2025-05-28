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
  venueDescription: string;
  terms: string;
  venueImages: File[];
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




export interface ImageDetails {
   Images: File[];
}

export interface LocationFeatures {
  features: string[];
  parkingFeatures: string[];
  venueDescription: string;
  terms: string;
}