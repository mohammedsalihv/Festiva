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
  id?: string;
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

export interface responseAllHostsDTO {
  data: responseHostDTO[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
}

export interface HostDetailsDTO {
  host: {
    id: string;
    name: string;
    phone: string;
    email: string;
    role: string;
    location: string;
    profilePic: string;
  };
  accessToken: string;
  refreshToken: string;
}

export function mapToResponseHostDTO(host: any): responseHostDTO {
  return {
    id: host._id?.toString(),
    name: host.name,
    email: host.email,
    phone: host.phone,
    location: host.location,
    role: host.role ?? "host",
    profilePic: host.profilePic ?? "",
    isBlocked: host.isBlocked,
    isVerified: host.isVerified ?? host.isVerfied,
    isSubscriber: host.isSubscriber,
    isActive: host.isActive,
    listedAssets: host.listedAssets,
    totalRequests: host.totalRequests,
    acceptedRequests: host.acceptedRequests,
    rejectedRequests: host.rejectedRequests,
  };
}
