import { IUserModel } from "../../../modelInterface/user/interface.user";
import { resetPasswordDTO } from "../../../../../types/DTO/user/dto.user";
import { Types } from "mongoose";

export interface IUserRepository {
  findByEmail(email: string): Promise<IUserModel | null>;
  checkMail(email: string): Promise<boolean | null>;
  findById(userId: string | Types.ObjectId): Promise<IUserModel | null>;
  findByIdsForReviews(userId: string[]): Promise<IUserModel[] | null>;
  resetPassword(email: string, form: resetPasswordDTO): Promise<boolean | null>;
  deleteProfile(userId: string): Promise<boolean>;
}
