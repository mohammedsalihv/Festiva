import { IUser } from "../../modelInterface/user.interface";
import { EditUserPayload } from "../../modelInterface/editUser.interface";
export interface IUserManagementRepository {
  findAll(): Promise<IUser[]>;
  UserBlockUnblock(userId: string, isBlocked: boolean): Promise<boolean>;
  editUser(userId: string, form: EditUserPayload): Promise<IUser[]>;
  changeProfile(userId: string, imageFile: string): Promise<IUser>;
  deleteUser(userId: string): Promise<boolean>;
}
