export interface IUser {
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
    gender?: string;
    country?: string;
    timestamp?: Date;
    isBlocked?: boolean;
  }
  
  