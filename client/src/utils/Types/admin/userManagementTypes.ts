import { User } from "../user/authTypes";

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
  role: string;
  profilePic: string;
  isActive: boolean;
  isBlocked: boolean;
}

export interface EditUserResponse {
  message: string;
  updatedUser: User;
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
