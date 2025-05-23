import { IUserRepository } from "../../../../domain/entities/repositoryInterface/user/interface.userRepository";
import { IUser } from "../../../../domain/entities/modelInterface/user.interface";
import { UserModal } from "../../../../domain/models/userModel";

export class UserRepository implements IUserRepository {
  async findByEmail(email: string): Promise<IUser | null> {
    return UserModal.findOne({ email });
  }
}