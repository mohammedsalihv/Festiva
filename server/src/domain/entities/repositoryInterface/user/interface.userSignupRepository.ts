import { responseUserDTO } from "../../../../config/DTO/user/dto.user";
import { IUser } from "../../modelInterface/interface.user";

export interface IUserSignupRepository {
  findByEmail(email: string): Promise<responseUserDTO | null>;
  createUser(user: IUser): Promise<responseUserDTO>;
}
