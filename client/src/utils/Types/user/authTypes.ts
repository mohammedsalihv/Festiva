


export interface User {
  _id: string;
  email: string;
  firstname: string;
  lastname: string;
  isBlocked:boolean;
  isActive: boolean;
  isVerified: boolean;
  phone: string;
  password?: string; 
  profilePic?: string;
  role: "admin" | "user";
  timestamp: string;
}


export interface ErrorState {
  email?: string;
  password?: string;
}

export type GoogleLoginData =
  | {
      code: string;
    }
  | {
      name: string;
      email: string;
      sub: string;
    };


export interface DecodedToken {
  name: string;
  email: string;
  sub: string;
  [key: string]: unknown;
}