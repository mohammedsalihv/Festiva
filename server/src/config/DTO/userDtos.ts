export interface UserDetailsDTO {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    role: string;
    profile: string | null;
    timestamp: string;
    isActive: boolean;
    isVerified: boolean;
    phone: string;
  }