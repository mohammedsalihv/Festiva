import { IUser } from "../../../../domain/entities/modelInterface/user.interface";
import { IUserGoogleRepository } from "../../../../domain/entities/repositoryInterface/user/interface.googleRepository";
import { UserModal } from "../../../../domain/models/userModel";

export class GoogleAuthRepository implements IUserGoogleRepository {
  async findByEmail(email: string): Promise<IUser | null> {
    return await UserModal.findOne({ email });
  }

  async createUser(user: IUser): Promise<IUser> {
    const newUser = new UserModal(user);
    return await newUser.save();
  }

  async updateUser(id: string, updates: Partial<IUser>): Promise<IUser | null> {
    return await UserModal.findByIdAndUpdate(id, updates, { new: true });
  }
}
