import { responseHostDTO } from "../../../../types/DTO/host/dto.host";
import { IAdminHostManagementRepository } from "../../../../domain/entities/repositoryInterface/admin/interface.adminHostManagement";
import CustomError from "../../../../utils/common/errors/CustomError";
import { EditHostPayload } from "../../../../domain/adminInterface/interface.editHost";
import {
  statusCodes,
  statusMessages,
} from "../../../../utils/common/messages/constantResponses";

export class AdminHostManagementUseCase {
  constructor(
    private AdminHostManagementRepository: IAdminHostManagementRepository
  ) {}

  async execute(): Promise<responseHostDTO[]> {
    const hosts = await this.AdminHostManagementRepository.findAllHosts();
    
    if (!hosts || hosts.length === 0) {
      throw new CustomError("Users empty", statusCodes.notfound);
    }

    return hosts;
  }

  async HostBlockUnblock(hostId: string, isBlocked: boolean): Promise<boolean> {
    const response = await this.AdminHostManagementRepository.HostblockUnblock(
      hostId,
      isBlocked
    );
    if (!response) {
      throw new CustomError(
        statusMessages.accountBlocked,
        statusCodes.serverError
      );
    }
    return response;
  }

  async editHost(
    hostId: string,
    form: EditHostPayload
  ): Promise<responseHostDTO[]> {
    const response = await this.AdminHostManagementRepository.editHost(
      hostId,
      form
    );

    if (!response || response.length === 0) {
      throw new CustomError("Host update failed", statusCodes.serverError);
    }

    return response;
  }

  async changeProfile(
    hostId: string,
    imageUrl: string
  ): Promise<responseHostDTO> {
    const response = await this.AdminHostManagementRepository.changeProfile(
      hostId,
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

  async deleteHost(hostId: string): Promise<boolean> {
    const result = await this.AdminHostManagementRepository.deleteHost(hostId);
    if (!result) {
      throw new CustomError("Deleting failed", statusCodes.serverError);
    }
    return result;
  }
}
