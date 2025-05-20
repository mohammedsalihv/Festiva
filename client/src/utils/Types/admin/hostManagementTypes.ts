import { Host } from "../host/authTypes";

export interface EditHostPayload {
  name: string;
  phone: string;
  role: string;
  isActive: boolean;
  isBlocked: boolean;
  location: string;
  isVerified: boolean;
  profilePic: string;
  isSubscriber: boolean;
  listedAssets: number;
  totalRequests: number;
  acceptedRequests: number;
  rejectedRequests: number;
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

export const HostSortOptions = [
  { label: "Name (A-Z)", value: "name" },
  { label: "Name (Z-A)", value: "name-desc" },
  { label: "Created Date", value: "createdAt" },
  { label: "Only Blocked", value: "Blocked" },
  { label: "Only Unblocked", value: "Unblocked" },
  { label: "Only Active", value: "Active" },
  { label: "Only hosts", value: "host" },
];