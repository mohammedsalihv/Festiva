export interface AdminState {
  adminInfo: {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
    role: string;
    profilePic?: string;
    isBlocked?: boolean;
    isActive?: boolean;
    timestamp?: string | Date;
    accessToken: string;
    refreshToken: string;
  } | null;
}
