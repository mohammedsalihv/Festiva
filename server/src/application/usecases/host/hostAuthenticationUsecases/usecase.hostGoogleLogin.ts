import { IHostGoogleLoginUseCase } from "../../../../domain/usecaseInterface/host/authenticationUsecaseInterfaces/interface.hostGoogleLoginUseCase";
import { HostDetailsDTO } from "../../../../types/DTO/host/dto.host";
import { googleSignupHostDTO } from "../../../../types/DTO/user/dto.hostGoogleSignup";
import { IHostGoogle } from "../../../../domain/entities/baseInterface/host/authenticationInterfaces/interface.hostGoogle";
import { IHostRepository } from "../../../../domain/entities/repositoryInterface/host/services repository interface/interface.hostRepository";
import { IHostGoogleLoginRepository } from "../../../../domain/entities/repositoryInterface/host/auth repository interface/interface.hostGoogleLoginRepository";
import { TokenService } from "../../../tokenService/service.token";
import CustomError from "../../../../utils/common/errors/CustomError";
import { statusCodes } from "../../../../utils/common/messages/constantResponses";

export class HostGoogleLoginUseCase implements IHostGoogleLoginUseCase {
  constructor(
    private hostRepository: IHostRepository,
    private hostGoogleLoginRepository: IHostGoogleLoginRepository,
    private tokenService: TokenService
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

    const existingHost = await this.hostRepository.findByEmail(data.email);

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
        profilePic:
          data.profilePic?.trim() ||
          "https://res.cloudinary.com/salvix/image/upload/v1754079301/user_z8tayu.png",
        role: "host",
      };
      host = await this.hostGoogleLoginRepository.createHost(newHost);
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
