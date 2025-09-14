import { responseUserDTO } from "../../../../types/DTO's/userDTO's/userBaseDTO's/dto.user";
import { IUserModel } from "../../../entities/databaseModelInterfaces/userModelInterfaces/interface.user";

export interface IUserSignupRepository {
  findByEmail(email: string): Promise<responseUserDTO | null>;
  createUser(user: IUserModel): Promise<IUserModel>;
}
