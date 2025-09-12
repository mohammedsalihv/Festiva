import { responseUserDTO } from "../../../../types/DTO's/userDTO's/userBaseDTO's/dto.user";
export interface IUserLoginRepository {
  findByEmail(email: string): Promise<responseUserDTO | null>;
}
