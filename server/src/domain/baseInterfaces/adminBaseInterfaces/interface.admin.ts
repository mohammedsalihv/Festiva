import { IUserModel } from "../../entities/databaseModelInterfaces/userModelInterfaces/interface.user";
export interface IAdminRepository {
  findByEmail(email: string): Promise<IUserModel | null>;
}
