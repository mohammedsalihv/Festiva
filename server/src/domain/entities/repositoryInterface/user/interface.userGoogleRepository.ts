import { IUser } from "../../modelInterface/interface.user";
import { responseUserDTO } from "../../../../types/DTO/user/dto.user";
export interface IUserGoogleRepository {
  findByEmail(email: string): Promise<responseUserDTO | null>;
  updateUser(
    id: string,
    updates: Partial<IUser>
  ): Promise<responseUserDTO | null>;
  createUser(user: IUser): Promise<responseUserDTO>;
}
