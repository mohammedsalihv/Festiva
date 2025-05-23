import { IUserLoginRepository } from "../../../../domain/entities/repositoryInterface/user/interface.loginRepository";
import { IUser } from "../../../../domain/entities/modelInterface/user.interface";
import { UserModal } from "../../../../domain/models/userModel";

export class LoginRepository implements IUserLoginRepository {
  async findByEmail(email: string): Promise<IUser | null> {
    return UserModal.findOne({ email });
  }
}