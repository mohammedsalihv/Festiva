import { IUser } from "../../../domain/entities/modelInterface/interface.user";
import { IUserManagementRepository } from "../../../domain/entities/repositoryInterface/admin/interface.userManagement";
import { UserModal } from "../../../domain/models/userModel";
import { pickDefinedFields } from "../../../utils/pickDefinedFields";
import { EditUserPayload } from "../../../domain/entities/adminInterface/interface.editUser";
import { responseUserDTO } from "../../../config/DTO/user/dto.user";
import { toResponseUserDTO } from "../../../config/DTO/user/dto.user";

export class UserManagementRepository implements IUserManagementRepository {
  async findAll(): Promise<responseUserDTO[]> {
    return UserModal.find().exec();
  }

  async UserBlockUnblock(userId: string, isBlocked: boolean): Promise<boolean> {
    const response = await UserModal.updateOne({ _id: userId }, { isBlocked });
    return response.modifiedCount > 0;
  }

  async editUser(
    userId: string,
    form: EditUserPayload
  ): Promise<responseUserDTO[]> {
    const allowedFields = [
      "firstname",
      "lastname",
      "phone",
      "role",
      "isActive",
      "isBlocked",
    ] as const satisfies (keyof IUser)[];

    const updateData = pickDefinedFields(form, allowedFields);

    const response = await UserModal.updateOne(
      { _id: userId },
      { $set: updateData }
    );
    if (response.modifiedCount === 0) {
      throw new Error("User update failed");
    }

    const users = await UserModal.find().exec();
    return users.map(toResponseUserDTO);
  }

  async changeProfile(
    userId: string,
    imageUrl: string
  ): Promise<responseUserDTO> {
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

  async deleteUser(userId: string): Promise<boolean> {
    const response = await UserModal.findByIdAndDelete({ _id: userId });
    return response !== null;
  }
}
