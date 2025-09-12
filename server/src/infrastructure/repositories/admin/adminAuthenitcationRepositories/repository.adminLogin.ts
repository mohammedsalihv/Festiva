import { IAdminLoginRepository } from "../../../../domain/entities/repositoryInterface/admin/authentication/interface.adminLogin";
import { UserModel } from "../../../../domain/models/user/userAuthenticationModels/userModel";
import { responseUserDTO } from "../../../../types/DTO's/userDTO's/userBaseDTO's/dto.user";

export class AdminLoginRepository implements IAdminLoginRepository {
  async findByEmail(email: string): Promise<responseUserDTO | null> {
    return UserModel.findOne({ email });
  }
}
