import CustomError from "../../../../utils/baseUtilities/errors/CustomError";
import {
  statusCodes,
  statusMessages,
} from "../../../../utils/baseUtilities/messages/constantResponses";
import { mailValidation } from "../../../../types/DTO's/hostDTO's/hostBaseDTO's/dto.host";
import { IHostUseCase } from "../../../../domain/usecaseInterface/host/baseUsecaseInterfaces/interface.hostUseCase";
import { IHostRepository } from "../../../../domain/entities/repositoryInterface/host/hostBaseRepositoryInterfaces/interface.hostRepository";
import { IHostModel } from "../../../../domain/entities/databaseModelInterfaces/hostModelInterfaces/interface.host";

export class HostUseCase implements IHostUseCase {
  constructor(private _hostRepository: IHostRepository) {}

  async validateEmail(email: string): Promise<mailValidation> {
    const host = await this._hostRepository.findByEmail(email);

    if (!host) {
      return {
        success: true,
        message: "Email is available",
        status: statusCodes.Success,
      };
    }

    if (host.isBlocked) {
      throw new CustomError(
        statusMessages.accountBlocked,
        statusCodes.unAuthorized
      );
    }

    throw new CustomError(
      statusMessages.accountExisted,
      statusCodes.unAuthorized
    );
  }
  async hostDetails(hostId: string): Promise<IHostModel | null> {
    return await this._hostRepository.findById(hostId);
  }
}
