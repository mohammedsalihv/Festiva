import { UserModal } from "../../../../domain/models/userModel";
import { IUserProfileRepository } from "../../../../domain/entities/repositoryInterface/user/interface.userProfileRepository";
import { profileEditDTO } from "../../../../config/DTO/user/dto.user";
import { responseUserDTO } from "../../../../config/DTO/user/dto.user";
import { toResponseUserDTO } from "../../../../config/DTO/user/dto.user";


export class UserProfileRepository implements IUserProfileRepository {
  async setProfilePic(userId: string, imageUrl: string): Promise<responseUserDTO> {
    const updatedUser = await UserModal.findByIdAndUpdate(
      userId,
      { profilePic: imageUrl },
      { new: true }
    );

    if (!updatedUser) {
      throw new Error("User not found or update failed");
    }

    return toResponseUserDTO(updatedUser);
  }

  async profileEdit(userId: string, form: profileEditDTO): Promise<responseUserDTO> {
    const updatedUser = await UserModal.findByIdAndUpdate(
      userId,
      { $set: form },
      { new: true }
    );

    if (!updatedUser) {
      throw new Error("User not found or update failed");
    }

    return toResponseUserDTO(updatedUser);
  }

  async changePassword(userId: string, hashedPassword: string): Promise<responseUserDTO> {
    const updatedUser = await UserModal.findByIdAndUpdate(
      userId,
      { $set: { password: hashedPassword } },
      { new: true }
    );

    if (!updatedUser) {
      throw new Error("User not found or update failed");
    }

    return toResponseUserDTO(updatedUser);
  }
}
