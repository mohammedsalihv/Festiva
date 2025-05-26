import { IUser } from "../../modelInterface/interface.user";
import { resetPasswordDTO } from "../../../../config/DTO/user/dto.user";

export interface IUserRepository {
  findByEmail(email: string): Promise<IUser | null>;
  checkMail(email: string): Promise<Boolean | null>;
  findById(userId: string): Promise<IUser | null>;
  resetPassword(email: string, form: resetPasswordDTO): Promise<Boolean | null>;
  deleteProfile(userId: string): Promise<boolean>;
}
