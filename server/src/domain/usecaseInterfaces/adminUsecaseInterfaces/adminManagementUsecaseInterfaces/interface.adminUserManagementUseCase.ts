import { EditUserPayload } from "../../../baseInterfaces/adminBaseInterfaces/interface.editUser";
import {
  responseAllUsersDTO,
  responseUserDTO,
} from "../../../../types/DTO's/userDTO's/userBaseDTO's/dto.user";

export interface IAdminUserManagementUseCase {
  findAllUsers(page: number, limit: number): Promise<responseAllUsersDTO>;
  userBlockUnblock(userId: string, isBlocked: boolean): Promise<boolean>;
  editUser(userId: string, form: EditUserPayload): Promise<responseUserDTO[]>;
  changeProfile(userId: string, imageUrl: string): Promise<responseUserDTO>;
  deleteUser(userId: string): Promise<boolean>;
}
