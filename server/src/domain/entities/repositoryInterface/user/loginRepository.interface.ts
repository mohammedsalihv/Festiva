import { IUser } from "../../modelInterface/user.interface";
export interface IUserRepository {
  findByEmail(email: string): Promise<IUser | null>;
}
