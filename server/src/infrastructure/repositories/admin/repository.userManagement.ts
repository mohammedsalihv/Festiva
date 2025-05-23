import { IUser } from "../../../domain/entities/modelInterface/user.interface";
import { IUserManagementRepository } from "../../../domain/entities/repositoryInterface/admin/userManagement.interface";
import { UserModal } from "../../../domain/models/userModel";
import { pickDefinedFields } from "../../../utils/pickDefinedFields";
import { EditUserPayload } from "../../../domain/entities/modelInterface/editUser.interface";

export class UserManagementRepository implements IUserManagementRepository {
  async findAll(): Promise<IUser[]> {
    return UserModal.find().exec();
  }

  async UserBlockUnblock(userId: string, isBlocked: boolean): Promise<boolean> {
    const response = await UserModal.updateOne({ _id: userId }, { isBlocked });
    return response.modifiedCount > 0;
  }

  async editUser(userId: string, form: EditUserPayload)
: Promise<IUser[]> {
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

    return UserModal.find().exec();
  }

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

  async deleteUser(userId: string): Promise<boolean> {
    const response = await UserModal.findByIdAndDelete({ _id: userId });
    return response !== null;
  }
}
