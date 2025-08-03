export interface IUserModel {
  id?: string;
  firstname?: string;
  lastname?: string;
  email: string;
  password?: string;
  phone?: string;
  profilePic?: string;
  role: string;
  isActive?: boolean;
  isBlocked?: boolean;
  timestamp?: Date;
}
