import { responseUserDTO } from "../../../../config/DTO/user/dto.user";
import { EditUserPayload } from "../../adminInterface/interface.editUser";
export interface IUserManagementRepository {
  findAll(): Promise<responseUserDTO[]>;
  UserBlockUnblock(userId: string, isBlocked: boolean): Promise<boolean>;
  editUser(userId: string, form: EditUserPayload): Promise<responseUserDTO[]>;
  changeProfile(userId: string, imageFile: string): Promise<responseUserDTO>;
  deleteUser(userId: string): Promise<boolean>;
}
