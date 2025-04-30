
import { Iuser } from "../../../../domain/entities/modelInterface/user.interface";
import { UserModal } from "../../../../domain/models/userModel";
import { IUserProfileRepository } from "../../../../domain/entities/repositoryInterface/user/profileData.interface";

export class UserProfileRepository implements IUserProfileRepository {
  async getUserById(userId: string): Promise<Iuser | null> {
    return UserModal.findById(userId); // or findOne({ _id: userId });
  }
  async findByEmail(email: string): Promise<Iuser | null> {
    return UserModal.findOne({ email });
  }
}
