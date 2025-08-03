import { IUserModel } from "../../../../domain/entities/modelInterface/user/interface.user";
import { IAdminUserManagementRepository } from "../../../../domain/entities/repositoryInterface/admin/management/interface.adminUserManagementRepository";
import { UserModel } from "../../../../domain/models/user/userAuthenticationModels/userModel";
import { pickDefinedFields } from "../../../../utils/validations/user/pickDefinedFields";
import { EditUserPayload } from "../../../../domain/adminInterface/interface.editUser";
import {
  responseUserDTO,
  responseAllUsersDTO,
} from "../../../../types/DTO/user/dto.user";
import { toResponseUserDTO } from "../../../../types/DTO/user/dto.user";

export class AdminUserManagementRepository
  implements IAdminUserManagementRepository
{
  async findAllUsers(
    page: number,
    limit: number
  ): Promise<responseAllUsersDTO> {
    const skip = (page - 1) * limit;
    const [rawUsers, totalItems] = await Promise.all([
      UserModel.find().skip(skip).limit(limit).exec(),
      UserModel.countDocuments().exec(),
    ]);
    const totalPages = Math.ceil(totalItems / limit);

    const data: responseUserDTO[] = rawUsers.map((user) => ({
      id: user._id.toString(),
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      phone: user.phone,
      profilePic: user.profilePic,
      role: user.role,
      isActive: user.isActive,
      timestamp: user.timestamp,
      isBlocked: user.isBlocked,
    }));

    return {
      data,
      totalItems,
      totalPages,
      currentPage: page,
    };
  }

  async UserBlockUnblock(userId: string, isBlocked: boolean): Promise<boolean> {
    const response = await UserModel.updateOne({ _id: userId }, { isBlocked });
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
    ] as const satisfies (keyof IUserModel)[];

    const updateData = pickDefinedFields(form, allowedFields);

    const response = await UserModel.updateOne(
      { _id: userId },
      { $set: updateData }
    );
    if (response.modifiedCount === 0) {
      throw new Error("User update failed");
    }

    const users = await UserModel.find().exec();
    return users.map(toResponseUserDTO);
  }

  async changeProfile(
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

  async deleteUser(userId: string): Promise<boolean> {
    const response = await UserModel.findByIdAndDelete({ _id: userId });
    return response !== null;
  }
}
