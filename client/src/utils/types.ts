
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
  isBlocked:boolean;
  isActive: boolean;
  isVerified: boolean;
  phone: string;
  password?: string; 
  profilePic?: string;
  role: "admin" | "user";
  timestamp: string;
}

export interface Host {
  _id:string;
  name: string;
  email: string;
  phone: string;
  password: string;
  location: string;
  role?: string;
  profilePic?: string;
  isBlocked?: boolean;
  isVerified?: boolean;
  isSubscriber?: boolean;
  isActive?: boolean;
  listedAssets?: number;
  totalRequests?: number;
  acceptedRequests?: number;
  rejectedRequests?: number;
  timestamp:string;
}


export interface GetUsersResponse {
  data: User[];
  message: string;
  success: boolean;
}



export interface BlockUserResponse {
  message?: string;
  success: boolean;
}



export interface EditUserPayload {
  firstname: string;
  lastname: string;
  phone: string;
  role: string;
  profilePic:string;
  isActive: boolean;
  isBlocked: boolean;
}

export interface EditUserResponse {
  message: string;
  updatedUser: User;
}


export interface EditHostPayload {
  name:string;
  phone:string;
  role: string;
  isActive: boolean;
  isBlocked: boolean;
  location:string;
  isVerified:boolean;
  profilePic:string;
  isSubscriber:boolean;
  listedAssets:number;
  totalRequests:number;
  acceptedRequests:number;
  rejectedRequests:number;
}

export interface EditHostResponse {
  message: string;
  updatedHost: Host;
}






export interface GetHostsResponse {
  data: Host[];
  message: string;
  success: boolean;
}

export interface BlockHostResponse {
  message?: string;
  success: boolean;
}


export const UserSortOptions = [
  { label: "Firstname (A-Z)", value: "name" },
  { label: "Firstname (Z-A)", value: "name-desc" },
  { label: "Created Date", value: "createdAt" },
  { label: "Only Blocked", value: "Blocked" },
  { label: "Only Unblocked", value: "Unblocked" },
  { label: "Only Active", value: "Active" },
  { label: "Only Admins", value: "Admin" },
];

export const HostSortOptions = [
  { label: "Name (A-Z)", value: "name" },
  { label: "Name (Z-A)", value: "name-desc" },
  { label: "Created Date", value: "createdAt" },
  { label: "Only Blocked", value: "Blocked" },
  { label: "Only Unblocked", value: "Unblocked" },
  { label: "Only Active", value: "Active" },
  { label: "Only hosts", value: "host" },
];
