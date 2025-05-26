import { IAdminLoginRepository } from "../../../../domain/entities/repositoryInterface/admin/interface.adminLogin";
import { UserModal } from "../../../../domain/models/userModel";
import { responseUserDTO } from "../../../../config/DTO/user/dto.user";

export class AdminLoginRepository implements IAdminLoginRepository {
  async findByEmail(email: string): Promise<responseUserDTO | null> {
    return UserModal.findOne({ email });
  }
}
