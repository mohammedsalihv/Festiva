import { responseUserDTO } from "../../../../config/DTO/user/dto.user";
export interface IAdminLoginRepository {
  findByEmail(email: string): Promise<responseUserDTO | null>;
}
