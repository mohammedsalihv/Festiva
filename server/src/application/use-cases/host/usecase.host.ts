import CustomError from "../../../utils/common/errors/CustomError";
import {
  statusCodes,
  statusMessages,
} from "../../../utils/common/messages/constantResponses";
import { mailValidation } from "../../../types/DTO/host/dto.host";
import { IHostUseCase } from "../../../domain/usecaseInterface/host/interface.hostUseCase";
import { IHostRepository } from "../../../domain/entities/repositoryInterface/host/services repository interface/interface.hostRepository";

export class HostUseCase implements IHostUseCase {
  constructor(private readonly hostRepository: IHostRepository) {}

  async validateEmail(email: string): Promise<mailValidation> {
    const host = await this.hostRepository.findByEmail(email);

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
}
