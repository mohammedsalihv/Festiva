import { IHostLoginRepository } from "../../../../domain/entities/repositoryInterface/host/auth repository interface/interface.hostLoginRepository";
import { IHostRepository } from "../../../../domain/entities/repositoryInterface/host/services repository interface/interface.hostRepository";
import CustomError from "../../../../utils/common/errors/CustomError";
import { TokenService } from "../../../tokenService/service.token";
import bcrypt from "bcrypt";
import { HostDetailsDTO } from "../../../../types/DTO/host/dto.host";
import {
  statusCodes,
  statusMessages,
} from "../../../../utils/common/messages/constantResponses";

export class HostLoginUseCase {
  constructor(
    private HostLoginRepository: IHostLoginRepository,
    private HostRepository: IHostRepository,
    private tokenService: TokenService
  ) {}

  async execute(email: string, password: string): Promise<HostDetailsDTO> {
    if (!email || !password) {
      throw new CustomError("All fields are required", statusCodes.forbidden);
    }

    const host = await this.HostLoginRepository.findByEmail(email);
    if (!host) {
      throw new CustomError(
        statusMessages.invalidCredential,
        statusCodes.unAuthorized
      );
    }

    const hostValidate = await this.HostRepository.findByEmail(email);
    if (!hostValidate) {
      throw new CustomError(
        statusMessages.accountNotfound,
        statusCodes.notfound
      );
    }

    const isPasswordValid = hostValidate.password
      ? await bcrypt.compare(password, hostValidate.password)
      : false;

    if (!isPasswordValid) {
      throw new CustomError(
        statusMessages.invalidCredential,
        statusCodes.unAuthorized
      );
    }

    const accessToken = this.tokenService.generateAccessToken({
      id: host.id!,
      role: host.role,
    });
    const refreshToken = this.tokenService.generateRefreshToken({
      id: host.id!,
      role: host.role,
    });

    return {
      accessToken,
      refreshToken,
      host: {
        id: host.id!,
        name: host.name ?? "",
        email: host.email ?? "",
        phone: host.phone ?? "",
        role: host.role || "host",
        location: host.location ?? "",
        profilePic: host.profilePic ?? "",
      },
    };
  }
}
