import { userDetailsDTO } from "../../../../types/DTO's/userDTO's/userBaseDTO's/dto.user";

export interface IUserLoginUseCase {
  userLogin(email: string, password: string): Promise<userDetailsDTO>;
}
