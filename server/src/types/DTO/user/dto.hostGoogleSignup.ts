export interface googleSignupHostDTO {
  name: string;
  email: string;
  phone?: string;
  location?: string;
  role?: string;
  signupMethod: string;
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

export interface userGoogleSignupDTO {
  firstname: string;
  email: string;
  profilePic: string;
  signupMethod: string;
}
