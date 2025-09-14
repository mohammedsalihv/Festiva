import { IUserModel } from "../../../../domain/entities/databaseModelInterfaces/userModelInterfaces/interface.user";
import { IAdminUserManagementRepository } from "../../../../domain/repositoryInterfaces/adminRepositoryInterfaces/adminManagementRepositoryInterfaces/interface.adminUserManagementRepository";
import { UserModel } from "../../../../domain/entities/databaseModels/user/userAuthenticationModels/userModel";
import { pickDefinedFields } from "../../../../utils/validations/userValidations/pickDefinedFields";
import { EditUserPayload } from "../../../../domain/baseInterfaces/adminBaseInterfaces/interface.editUser";
import {
  responseUserDTO,
  responseAllUsersDTO,
} from "../../../../types/DTO's/userDTO's/userBaseDTO's/dto.user";
import { toResponseUserDTO } from "../../../../types/DTO's/userDTO's/userBaseDTO's/dto.user";

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

    const data: responseUserDTO[] = rawUsers.map(toResponseUserDTO);

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

  async getAllUsers(): Promise<IUserModel[]> {
    return await UserModel.find().lean();
  }

  async deleteUser(userId: string): Promise<boolean> {
    const response = await UserModel.findByIdAndDelete({ _id: userId });
    return response !== null;
  }
}
