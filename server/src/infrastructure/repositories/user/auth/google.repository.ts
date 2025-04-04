import { Iuser } from "../../../../domain/entities/modelInterface/user.interface";
import { IUserRepository } from "../../../../domain/entities/repositoryInterface/user/userRepository.interface";
import { UserModal } from "../../../../domain/models/userModel";

export class GoogleAuthRepository implements IUserRepository {
  async findByEmail(email: string): Promise<Iuser | null> {
    return UserModal.findOne({ email });
  }
  async createUser(user: Iuser): Promise<Iuser> {
    const newUser = new UserModal(user);
    return await newUser.save();
  }
  async updateUser(id: string, updates: Partial<Iuser>): Promise<Iuser | null> {
    return UserModal.findByIdAndUpdate(id, updates, { new: true });
  }
}
