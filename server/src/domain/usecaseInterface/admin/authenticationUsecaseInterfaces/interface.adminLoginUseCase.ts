import { AdminDetailsDTO } from "../../../../types/DTO/admin/dto.admin";

export interface IAdminLoginUseCase {
  loginByadmin(email: string, password: string): Promise<AdminDetailsDTO>;
}
