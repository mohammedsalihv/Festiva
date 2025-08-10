import { resetPasswordDTO } from "../../../../types/DTO/user/dto.user";

export interface IUserUseCase {
  findByEmail(email: string): Promise<any>;
  checkMail(email: string): Promise<boolean | null>;
  findById(userId: string): Promise<any>;
  resetPassword(email: string, form: resetPasswordDTO): Promise<boolean | null>;
  deleteProfile(userId: string): Promise<boolean>;
}
