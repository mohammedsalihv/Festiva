
export interface AdminDetailsDTO {
  admin: {
    id: string;
    firstname: string;
    lastname: string;
    phone: string;
    email: string;
    profilePic?: string;
    role: string;
    isBlocked?: boolean;
    isActive?: boolean;
    timestamp?: Date;
  };
  accessToken: string;
  refreshToken: string;
}