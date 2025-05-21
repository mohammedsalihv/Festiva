export interface IUser {
  _id?: string;
  firstname?: string;
  lastname?: string;
  email: string; 
  password?: string;
  phone?: string;
  profilePic?: string;
  role: "admin" | "user";
  googleId?: string;
  isActive: boolean; 
  timestamp?: Date;
  isBlocked: boolean; 
}
