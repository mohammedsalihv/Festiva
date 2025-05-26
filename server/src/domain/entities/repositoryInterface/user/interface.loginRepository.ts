import { responseUserDTO } from "../../../../config/DTO/user/dto.user";
export interface IUserLoginRepository {
  findByEmail(email: string): Promise<responseUserDTO | null>;
}
