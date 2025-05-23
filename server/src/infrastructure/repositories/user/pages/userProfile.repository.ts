import { IUser } from "../../../../domain/entities/modelInterface/user.interface";
import { UserModal } from "../../../../domain/models/userModel";
import { IUserProfileRepository } from "../../../../domain/entities/repositoryInterface/user/interface.userProfile";
import { profileEditDTO } from "../../../../config/DTO/userDtos";

export class UserProfileRepository implements IUserProfileRepository {
  async setProfilePic(userId: string, imageUrl: string): Promise<IUser> {
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

  
  async profileEdit(userId: string, form: profileEditDTO): Promise<IUser> {
    const updatedUser = await UserModal.findByIdAndUpdate(
      userId,
      { $set: form },
      { new: true }
    );

    if (!updatedUser) {
      throw new Error("User not found or update failed");
    }

    return updatedUser;
  }
}
