export interface IHostGoogle {
  id?: string;
  name?: string;
  email?: string;
  phone?: string;
  password?: string;
  location?: string;
  role?: string;
  profilePic?: string;
  isBlocked?: boolean;
  isVerified?: boolean;
  isSubscriber?: boolean;
  isActive?: boolean;
  listedAssets?: number;
  signupMethod?:string;
  totalRequests?: number;
  acceptedRequests?: number;
  rejectedRequests?: number;
  timestamp?: Date;
}
