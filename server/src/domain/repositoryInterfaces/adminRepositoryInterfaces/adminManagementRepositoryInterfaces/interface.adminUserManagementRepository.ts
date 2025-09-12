import {
  responseUserDTO,
  responseAllUsersDTO,
} from "../../../../../types/DTO/user/dto.user";
import { EditUserPayload } from "../../../../adminInterface/interface.editUser";
import { IUserModel } from "../../../modelInterface/user/interface.user";

export interface IAdminUserManagementRepository {
  findAllUsers(page: number, limit: number): Promise<responseAllUsersDTO>;
  UserBlockUnblock(userId: string, isBlocked: boolean): Promise<boolean>;
  editUser(userId: string, form: EditUserPayload): Promise<responseUserDTO[]>;
  getAllUsers(): Promise<IUserModel[]>;
  changeProfile(userId: string, imageFile: string): Promise<responseUserDTO>;
  deleteUser(userId: string): Promise<boolean>;
}
