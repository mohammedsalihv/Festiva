import { IAdminRepository } from "../../../../domain/entities/baseInterface/admin/interface.admin";
import { IUserModel } from "../../../../domain/entities/modelInterface/user/interface.user";
import { UserModel } from "../../../../domain/models/user/userAuthenticationModels/userModel";

export class AdminRepository implements IAdminRepository {
  async findByEmail(email: string): Promise<IUserModel | null> {
    return UserModel.findOne({ email });
  }
}
