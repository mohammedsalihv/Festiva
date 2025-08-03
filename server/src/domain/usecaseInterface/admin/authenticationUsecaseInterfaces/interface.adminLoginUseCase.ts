import { AdminDetailsDTO } from "../../../../types/DTO/admin/admin.dto";

export interface IAdminLoginUseCase {
  loginByadmin(email: string, password: string): Promise<AdminDetailsDTO>;
}
