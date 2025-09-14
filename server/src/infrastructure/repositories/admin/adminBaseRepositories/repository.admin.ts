import { IAdminRepository } from "../../../../domain/baseInterfaces/adminBaseInterfaces/interface.admin";
import { IUserModel } from "../../../../domain/entities/databaseModelInterfaces/userModelInterfaces/interface.user";
import { UserModel } from "../../../../domain/entities/databaseModels/user/userAuthenticationModels/userModel";

export class AdminRepository implements IAdminRepository {
  async findByEmail(email: string): Promise<IUserModel | null> {
    return UserModel.findOne({ email });
  }
}
