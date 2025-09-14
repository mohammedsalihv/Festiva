import { responseAllUsersDTO , responseUserDTO } from "../../../../types/DTO's/userDTO's/userBaseDTO's/dto.user";
import { EditUserPayload } from "../../../baseInterfaces/adminBaseInterfaces/interface.editUser";
import { IUserModel } from "../../../entities/databaseModelInterfaces/userModelInterfaces/interface.user";

export interface IAdminUserManagementRepository {
  findAllUsers(page: number, limit: number): Promise<responseAllUsersDTO>;
  UserBlockUnblock(userId: string, isBlocked: boolean): Promise<boolean>;
  editUser(userId: string, form: EditUserPayload): Promise<responseUserDTO[]>;
  getAllUsers(): Promise<IUserModel[]>;
  changeProfile(userId: string, imageFile: string): Promise<responseUserDTO>;
  deleteUser(userId: string): Promise<boolean>;
}
