import { responseUserDTO } from "../../../../types/DTO/user/dto.user";
import { IAdminUserManagementRepository } from "../../../../domain/entities/repositoryInterface/admin/management/interface.adminUserManagement";
import CustomError from "../../../../utils/common/errors/CustomError";
import { EditUserPayload } from "../../../../domain/adminInterface/interface.editUser";
import { statusCodes } from "../../../../utils/common/messages/constantResponses";

export class AdminUserManagementUseCase {
  constructor(private AdminUserManagementRepository: IAdminUserManagementRepository) {}

  async execute(): Promise<responseUserDTO[]> {
    const users = await this.AdminUserManagementRepository.findAll();

    if (!users || users.length === 0) {
      throw new CustomError("Users empty", statusCodes.notfound);
    }

    return users;
  }

  async UserBlockUnblock(userId: string, isBlocked: boolean): Promise<boolean> {
    const response = await this.AdminUserManagementRepository.UserBlockUnblock(
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
    const response = await this.AdminUserManagementRepository.editUser(userId, form);

    if (!response || response.length === 0) {
      throw new CustomError("User update failed", statusCodes.serverError);
    }

    return response;
  }

  changeProfile(userId: string, imageUrl: string): Promise<responseUserDTO> {
    const response = this.AdminUserManagementRepository.changeProfile(
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
    const result = await this.AdminUserManagementRepository  .deleteUser(userId);
    if (!result) {
      throw new CustomError("Deleting failed", statusCodes.serverError);
    }
    return result;
  }
}
