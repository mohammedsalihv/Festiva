import { UserModel } from "../../../../domain/models/user/userAuthenticationModels/userModel";
import { IUserProfileRepository } from "../../../../domain/entities/repositoryInterface/user/account/interface.userProfileRepository";
import { profileEditDTO } from "../../../../types/DTO's/userDTO's/userBaseDTO's/dto.user";
import { responseUserDTO } from "../../../../types/DTO's/userDTO's/userBaseDTO's/dto.user";
import { toResponseUserDTO } from "../../../../types/DTO's/userDTO's/userBaseDTO's/dto.user";

export class UserProfileRepository implements IUserProfileRepository {
  async setProfilePic(
    userId: string,
    imageUrl: string
  ): Promise<responseUserDTO> {
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { profilePic: imageUrl },
      { new: true }
    );

    if (!updatedUser) {
      throw new Error("User not found or update failed");
    }

    return toResponseUserDTO(updatedUser);
  }

  async profileEdit(
    userId: string,
    form: profileEditDTO
  ): Promise<responseUserDTO> {
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { $set: form },
      { new: true }
    );

    if (!updatedUser) {
      throw new Error("User not found or update failed");
    }

    return toResponseUserDTO(updatedUser);
  }

  async changePassword(
    userId: string,
    hashedPassword: string
  ): Promise<responseUserDTO> {
    const updatedUser = await UserModel.findByIdAndUpdate(
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
