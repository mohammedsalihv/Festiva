
export interface VenueDetails {
  name: string;
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

export interface croppedImages {
  croppedImages: string[];
}

export interface LocationFeatures {
  features: string[];
  parkingFeatures: string[];
  venueDescription: string;
  terms: string;
}





export interface User {
  _id: string;
  email: string;
  firstname: string;
  lastname: string;
  isActive: boolean;
  isVerified: boolean;
  phone: string;
  password?: string; 
  profilePic: string[];
  role: "admin" | "user";
  timestamp: string;
  __v?: number;
}

export interface Host{
  id?:string
  name?: string;
  email?: string;
  phone?: string;
  password?: string;
  location?: string;
  role?:string;
  profile_pic?: string;
  timestamp?: Date;
}
