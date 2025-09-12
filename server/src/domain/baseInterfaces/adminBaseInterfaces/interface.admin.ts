import { IUserModel } from "../../modelInterface/user/interface.user";
export interface IAdminRepository {
  findByEmail(email: string): Promise<IUserModel | null>;
}
