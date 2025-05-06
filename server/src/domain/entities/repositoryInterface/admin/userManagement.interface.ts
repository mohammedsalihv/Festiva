import { IUser } from "../../modelInterface/user.interface";

export interface IUserManagementRepository {
  findAll(): Promise<IUser[]>;
}
