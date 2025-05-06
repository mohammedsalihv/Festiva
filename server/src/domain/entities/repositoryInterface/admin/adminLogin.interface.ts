import { IUser } from "../../modelInterface/user.interface";
export interface IAdminRepository {
  findByEmail(email: string): Promise<IUser | null>;
}
