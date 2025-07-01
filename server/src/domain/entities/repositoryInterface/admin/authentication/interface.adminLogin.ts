import { responseUserDTO } from "../../../../../types/DTO/user/dto.user";
export interface IAdminLoginRepository {
  findByEmail(email: string): Promise<responseUserDTO | null>;
}
