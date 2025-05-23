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

  export interface RegisterUserDTO {
    firstname: string;
    lastname: string;
    email: string;
    phone?: string;
    password: string;
  }
  

  export interface profileEditDTO {
    firstname: string;
    lastname: string;
    email: string;
    phone?: string;
  }