export interface RegisterHostDTO {
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
