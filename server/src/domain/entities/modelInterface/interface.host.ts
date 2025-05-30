export interface IHost {
  _id?: string;
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
  timestamp?: Date;
}
