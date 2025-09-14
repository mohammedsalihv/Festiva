import { IUserModel } from "../../../entities/databaseModelInterfaces/userModelInterfaces/interface.user";
import { resetPasswordDTO } from "../../../../types/DTO's/userDTO's/userBaseDTO's/dto.user";
import { Types } from "mongoose";

export interface IUserRepository {
  findByEmail(email: string): Promise<IUserModel | null>;
  checkMail(email: string): Promise<boolean | null>;
  findById(userId: string | Types.ObjectId): Promise<IUserModel | null>;
  findByIds(userId: string[]): Promise<IUserModel[] | null>;
  resetPassword(email: string, form: resetPasswordDTO): Promise<boolean | null>;
  deleteProfile(userId: string): Promise<boolean>;
}
