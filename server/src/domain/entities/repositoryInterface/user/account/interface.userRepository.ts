import { IUserModel } from "../../../modelInterface/user/interface.user";
import { resetPasswordDTO } from "../../../../../types/DTO/user/dto.user";

export interface IUserRepository {
  findByEmail(email: string): Promise<IUserModel | null>;
  checkMail(email: string): Promise<boolean | null>;
  findById(userId: string): Promise<IUserModel | null>;
  resetPassword(email: string, form: resetPasswordDTO): Promise<boolean | null>;
  deleteProfile(userId: string): Promise<boolean>;
}
