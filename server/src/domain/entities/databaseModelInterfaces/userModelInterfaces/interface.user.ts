export interface IUserModel {
  _id?: string;
  firstname?: string;
  lastname?: string;
  email: string;
  password?: string;
  phone?: string;
  profilePic?: string;
  role: string;
  isActive?: boolean;
  isBlocked?: boolean;
  timestamp?: string | Date;
}
