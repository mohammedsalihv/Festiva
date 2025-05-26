export interface IUser {
  _id?: string;
  firstname?: string;
  lastname?: string;
  email: string;
  password?: string;
  phone?: string;
  profilePic?: string;
  role: string;
  googleId?: string;
  isActive: boolean;
  isBlocked: boolean;
  timestamp?: Date;
}

