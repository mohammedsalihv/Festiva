import { IAdminUserManagementUseCase } from "../../../../domain/usecaseInterface/admin/managementUsecaseInterfaces/interface.adminUserManagementUseCase";
import {
  responseUserDTO,
  responseAllUsersDTO,
} from "../../../../types/DTO's/userDTO's/userBaseDTO's/dto.user";
import { IAdminUserManagementRepository } from "../../../../domain/entities/repositoryInterface/admin/management/interface.adminUserManagementRepository";
import CustomError from "../../../../utils/baseUtilities/errors/CustomError";
import { EditUserPayload } from "../../../../domain/baseInterfaces/adminBaseInterfaces/interface.editUser";
import { statusCodes } from "../../../../utils/baseUtilities/messages/constantResponses";

export class AdminUserManagementUseCase implements IAdminUserManagementUseCase {
  constructor(
    private _adminUserManagementRepository: IAdminUserManagementRepository
  ) {}

  async findAllUsers(
    page: number,
    limit: number
  ): Promise<responseAllUsersDTO> {
    const response = await this._adminUserManagementRepository.findAllUsers(
      page,
      limit
    );

    if (!response || response.data.length === 0) {
      throw new CustomError("Users empty", statusCodes.notfound);
    }

    return response;
  }

  async userBlockUnblock(userId: string, isBlocked: boolean): Promise<boolean> {
    const response = await this._adminUserManagementRepository.UserBlockUnblock(
      userId,
      isBlocked
    );

    if (!response) {
      throw new CustomError("Blocking failed", statusCodes.serverError);
    }
    return response;
  }

  async editUser(
    userId: string,
    form: EditUserPayload
  ): Promise<responseUserDTO[]> {
    const response = await this._adminUserManagementRepository.editUser(
      userId,
      form
    );

    if (!response || response.length === 0) {
      throw new CustomError("User update failed", statusCodes.serverError);
    }

    return response;
  }

  changeProfile(userId: string, imageUrl: string): Promise<responseUserDTO> {
    const response = this._adminUserManagementRepository.changeProfile(
      userId,
      imageUrl
    );

    if (!response) {
      throw new CustomError(
        "Profile photo update failed",
        statusCodes.serverError
      );
    }
    return response;
  }

  async deleteUser(userId: string): Promise<boolean> {
    const result = await this._adminUserManagementRepository.deleteUser(userId);
    if (!result) {
      throw new CustomError("Deleting failed", statusCodes.serverError);
    }
    return result;
  }
}
