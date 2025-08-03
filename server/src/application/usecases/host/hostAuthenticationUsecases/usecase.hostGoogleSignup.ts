import { IHostGoogleSignupUseCase } from "../../../../domain/usecaseInterface/host/authenticationUsecaseInterfaces/interface.hostGoogleSignupUseCase";
import { HostDetailsDTO } from "../../../../types/DTO/host/dto.host";
import { googleSignupHostDTO } from "../../../../types/DTO/user/dto.hostGoogleSignup";
import { IHostGoogle } from "../../../../domain/entities/baseInterface/host/authenticationInterfaces/interface.hostGoogle";
import { IHostRepository } from "../../../../domain/entities/repositoryInterface/host/services repository interface/interface.hostRepository";
import { IHostGoogleSignupRepository } from "../../../../domain/entities/repositoryInterface/host/auth repository interface/interface.hostGoogleSignupRepository";
import { TokenService } from "../../../tokenService/service.token";

export class HostGoogleSignupUseCase implements IHostGoogleSignupUseCase {
  constructor(
    private hostRepository: IHostRepository,
    private hostGoogleSignupRepository: IHostGoogleSignupRepository,
    private tokenService: TokenService
  ) {}

  async hostGoogleSignup(data: googleSignupHostDTO): Promise<HostDetailsDTO> {
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
