export interface Iuser {
    _id?: string;
    firstname: string;
    lastname?: string;
    email: string;
    password?: string ;
    phone?: string;
    profilePic?: string;
    role?: string;
    googleId?: string;
    isActive?: boolean;
    isVerified: boolean;
    gender?: string;
    country?: string;
    timestamp?: Date;
    is_blocked?: boolean;
  }
  
  