import { IUserModel } from "../../../entities/databaseModelInterfaces/userModelInterfaces/interface.user";

export interface IUserGoogleLoginRepository {
  findByEmail(email: string): Promise<IUserModel | null>;
  updateUser(
    id: string,
    updates: Partial<IUserModel>
  ): Promise<IUserModel | null>;
  createUser(user: IUserModel): Promise<IUserModel>;
}
