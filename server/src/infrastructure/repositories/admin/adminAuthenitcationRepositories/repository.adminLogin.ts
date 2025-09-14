import { IAdminLoginRepository } from "../../../../domain/repositoryInterfaces/adminRepositoryInterfaces/adminAuthenticationRepositoryInterfaces/interface.adminLogin";
import { UserModel } from "../../../../domain/entities/databaseModels/user/userAuthenticationModels/userModel";
import { responseUserDTO } from "../../../../types/DTO's/userDTO's/userBaseDTO's/dto.user";

export class AdminLoginRepository implements IAdminLoginRepository {
  async findByEmail(email: string): Promise<responseUserDTO | null> {
    return UserModel.findOne({ email });
  }
}
