import { IHostGoogleSignupUseCase } from "../../../../domain/usecaseInterface/host/authentication usecase interfaces/interface.hostGoogleSignupUseCase";
import { HostDetailsDTO } from "../../../../types/DTO/host/dto.host";
import { googleSignupHostDTO } from "../../../../types/DTO/host/usecase-dto/dto.hostGoogleSignup";
import { IHostGoogleAuth } from "../../../../domain/entities/modelInterface/host/interface.hostGoogleAuth";
import { IHostRepository } from "../../../../domain/entities/repositoryInterface/host/services repository interface/interface.hostRepository";
import { IHostGoogleSignupRepository } from "../../../../domain/entities/repositoryInterface/host/auth repository interface/interface.hostGoogleSignupRepository";
import { IHostSignupRepository } from "../../../../domain/entities/repositoryInterface/host/auth repository interface/interface.hostSignupRepository";
import { TokenService } from "../../../tokenService/service.token";
import ErrorHandler from "../../../../utils/common/errors/CustomError";
import { statusCodes } from "../../../../utils/common/messages/constantResponses";

export class HostGoogleSignupUseCase implements IHostGoogleSignupUseCase {
  constructor(
    private hostRepository: IHostRepository,
    private hostGoogleSignupRepository: IHostGoogleSignupRepository,
    private tokenService: TokenService
  ) {}

  async hostGoogleSignup(data: googleSignupHostDTO): Promise<HostDetailsDTO> {
    const existingHost = await this.hostRepository.findByEmail(data.email);

    let host: IHostGoogleAuth;

    if (existingHost) {
      host = existingHost;
    } else {
      const newHost: IHostGoogleAuth = {
        name: data.name || "",
        email: data.email,
        password: "",
        phone: data.phone || "",
        location: data.location || "",
        profilePic: data.profilePic || "",
        role: "host",
      };
      host = await this.hostGoogleSignupRepository.createHost(newHost);
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
        name: host.name!,
        email: host.email!,
        phone: host.phone!,
        location: host.location!,
        profilePic: host.profilePic || "",
        role: host.role || "host",
      },
    };
  }
}
