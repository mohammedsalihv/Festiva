export interface registerHostDTO {
  name: string;
  email: string;
  phone: string;
  password: string;
  location: string;
  role?: string;
  profilePic?: string;
  isBlocked?: boolean;
  isVerfied?: boolean;
  isSubscriber?: boolean;
  isActive?: boolean;
  listedAssets?: number;
  totalRequests?: number;
  acceptedRequests?: number;
  rejectedRequests?: number;
}


export interface responseHostDTO {
  id?:string;
  name: string;
  email: string;
  phone: string;
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
}


export interface HostDetailsDTO {
  host: {
    id: string;
    name: string;
    phone: string;
    email: string;
    role: string;
    location:string;
    profilePic:string;
  };
  accessToken: string;
  refreshToken: string;
}