import { IHostGoogleLoginUseCase } from "../../../../domain/usecaseInterface/host/authenticationUsecaseInterfaces/interface.hostGoogleLoginUseCase";
import { HostDetailsDTO } from "../../../../types/DTO's/hostDTO's/hostBaseDTO's/dto.host";
import { googleSignupHostDTO } from "../../../../types/DTO's/userDTO's/userAuthenticationDTO's/dto.hostGoogleSignup";
import { IHostGoogle } from "../../../../domain/entities/baseInterface/host/authenticationInterfaces/interface.hostGoogle";
import { IHostRepository } from "../../../../domain/entities/repositoryInterface/host/hostBaseRepositoryInterfaces/interface.hostRepository";
import { IHostGoogleLoginRepository } from "../../../../domain/entities/repositoryInterface/host/auth repository interface/interface.hostGoogleLoginRepository";
import { ITokenService } from "../../../../domain/entities/baseInterface/authenticationInterfaces/interface.tokenService";
import CustomError from "../../../../utils/baseUtilities/errors/CustomError";
import { statusCodes } from "../../../../utils/baseUtilities/messages/constantResponses";

export class HostGoogleLoginUseCase implements IHostGoogleLoginUseCase {
  constructor(
    private _hostRepository: IHostRepository,
    private _hostGoogleLoginRepository: IHostGoogleLoginRepository,
    private _tokenService: ITokenService
  ) {}

  async hostGoogleLogin(data: googleSignupHostDTO): Promise<HostDetailsDTO> {
    if (!data.email || typeof data.email !== "string") {
      throw new CustomError(
        "Invalid or missing email.",
        statusCodes.unAuthorized
      );
    }

    if (!data.name || typeof data.name !== "string") {
      throw new CustomError(
        "Invalid or missing name.",
        statusCodes.unAuthorized
      );
    }

    const existingHost = await this._hostRepository.findByEmail(data.email);

    let host: IHostGoogle;

    if (existingHost) {
      host = existingHost;
    } else {
      const newHost: IHostGoogle = {
        name: data.name || "",
        email: data.email,
        password: "",
        phone: data.phone || "",
        location: data.location?.trim() || "Not specified",
        profilePic: data.profilePic?.trim(),
        role: "host",
      };
      host = await this._hostGoogleLoginRepository.createHost(newHost);
    }

    const accessToken = this._tokenService.generateAccessToken({
      id: host.id!,
      role: host.role,
    });
    const refreshToken = this._tokenService.generateRefreshToken({
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
