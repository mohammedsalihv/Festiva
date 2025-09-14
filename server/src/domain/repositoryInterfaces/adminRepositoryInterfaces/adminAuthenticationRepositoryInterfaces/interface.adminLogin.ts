import { responseUserDTO } from "../../../../types/DTO's/userDTO's/userBaseDTO's/dto.user";
export interface IAdminLoginRepository {
  findByEmail(email: string): Promise<responseUserDTO | null>;
}
