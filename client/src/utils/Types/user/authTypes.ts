export interface User {
  _id: string;
  email: string;
  firstname: string;
  lastname: string;
  isBlocked: boolean;
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

export interface SignupData {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

export interface LoginData {
  email: string;
  password: string;
}


export type GoogleLoginData = {
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

export type GoogleAuthResult = {
  code?: string;
  [key: string]: unknown;
};

export interface GoogleUser {
  email: string;
  name: string;
  image: string;
}

export interface GoogleLoginResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}
