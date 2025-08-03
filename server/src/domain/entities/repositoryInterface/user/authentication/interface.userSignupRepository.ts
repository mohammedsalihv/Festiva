import { responseUserDTO } from "../../../../../types/DTO/user/dto.user";
import { IUserModel } from "../../../modelInterface/user/interface.user";

export interface IUserSignupRepository {
  findByEmail(email: string): Promise<responseUserDTO | null>;
  createUser(user: IUserModel): Promise<IUserModel>;
}
