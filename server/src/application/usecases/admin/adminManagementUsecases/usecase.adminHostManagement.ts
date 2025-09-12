import { responseHostDTO } from "../../../../types/DTO's/hostDTO's/hostBaseDTO's/dto.host";
import { IAdminHostManagementUseCase } from "../../../../domain/usecaseInterface/admin/managementUsecaseInterfaces/interface.adminHostManagementUseCase";
import { IAdminHostManagementRepository } from "../../../../domain/entities/repositoryInterface/admin/management/interface.adminHostManagementRepository";
import CustomError from "../../../../utils/baseUtilities/errors/CustomError";
import { EditHostPayload } from "../../../../domain/baseInterfaces/adminBaseInterfaces/interface.editHost";
import {
  statusCodes,
  statusMessages,
} from "../../../../utils/baseUtilities/messages/constantResponses";
import { responseAllHostsDTO } from "../../../../types/DTO's/hostDTO's/hostBaseDTO's/dto.host";

export class AdminHostManagementUseCase implements IAdminHostManagementUseCase{
  constructor(
    private _adminHostManagementRepository: IAdminHostManagementRepository
  ) {}

   async findAllHosts(page: number, limit: number): Promise<responseAllHostsDTO> {
    const response = await this._adminHostManagementRepository.findAllHosts(page, limit);
    
    if (!response.data || response.data.length === 0) {
      throw new CustomError("No hosts found", statusCodes.notfound);
    }

    return response;
  }

  async HostblockUnblock(hostId: string, isBlocked: boolean): Promise<boolean> {
    const response = await this._adminHostManagementRepository.HostblockUnblock(
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
    const response = await this._adminHostManagementRepository.editHost(
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
    const response = await this._adminHostManagementRepository.changeProfile(
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
    const result = await this._adminHostManagementRepository.deleteHost(hostId);
    if (!result) {
      throw new CustomError("Deleting failed", statusCodes.serverError);
    }
    return result;
  }
}
