import { IUser } from "../../modelInterface/user.interface";
export interface IUserGoogleRepository {
  findByEmail(email: string): Promise<IUser | null>;
  updateUser(id: string, updates: Partial<IUser>): Promise<IUser | null>;
  createUser(user: IUser): Promise<IUser>;
}