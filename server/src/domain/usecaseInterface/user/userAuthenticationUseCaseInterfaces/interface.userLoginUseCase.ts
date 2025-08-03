import { userDetailsDTO } from "../../../../types/DTO/user/dto.user";

export interface IUserLoginUseCase {
  userLogin(email: string, password: string): Promise<userDetailsDTO>;
}
