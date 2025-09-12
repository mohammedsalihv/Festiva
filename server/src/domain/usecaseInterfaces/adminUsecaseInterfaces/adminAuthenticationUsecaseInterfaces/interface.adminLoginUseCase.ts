import { AdminDetailsDTO } from "../../../../types/DTO's/adminDTO's/adminBaseDTO's/dto.admin";

export interface IAdminLoginUseCase {
  loginByadmin(email: string, password: string): Promise<AdminDetailsDTO>;
}
