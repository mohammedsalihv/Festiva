import { IUser } from "../../modelInterface/user.interface";
export interface IUserLoginRepository {
  findByEmail(email: string): Promise<IUser | null>;
}
