import { IUser } from "../../../../domain/entities/modelInterface/user.interface";
import { UserModal } from "../../../../domain/models/userModel";
import { IUserProfileRepository } from "../../../../domain/entities/repositoryInterface/user/interface.userProfile";

export class UserProfileRepository implements IUserProfileRepository {
  async changeProfile(userId: string, imageUrl: string): Promise<IUser> {
    const updatedUser = await UserModal.findByIdAndUpdate(
      userId,
      { profilePic: imageUrl },
      { new: true }
    );

    if (!updatedUser) {
      throw new Error("User not found or update failed");
    }

    return updatedUser;
  }
}
