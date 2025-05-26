import { IUser } from "../../modelInterface/interface.user";
export interface IAdminRepository {
  findByEmail(email: string): Promise<IUser | null>;
}
