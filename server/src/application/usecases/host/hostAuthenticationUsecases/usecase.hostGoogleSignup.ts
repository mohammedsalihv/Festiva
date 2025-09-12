import { IHostGoogleSignupUseCase } from "../../../../domain/usecaseInterface/host/authenticationUsecaseInterfaces/interface.hostGoogleSignupUseCase";
import { HostDetailsDTO } from "../../../../types/DTO's/hostDTO's/hostBaseDTO's/dto.host";
import { googleSignupHostDTO } from "../../../../types/DTO's/userDTO's/userAuthenticationDTO's/dto.hostGoogleSignup";
import { IHostGoogle } from "../../../../domain/entities/baseInterface/host/authenticationInterfaces/interface.hostGoogle";
import { IHostRepository } from "../../../../domain/entities/repositoryInterface/host/hostBaseRepositoryInterfaces/interface.hostRepository";
import { IHostGoogleSignupRepository } from "../../../../domain/entities/repositoryInterface/host/auth repository interface/interface.hostGoogleSignupRepository";
import { ITokenService } from "../../../../domain/entities/baseInterface/authenticationInterfaces/interface.tokenService";

export class HostGoogleSignupUseCase implements IHostGoogleSignupUseCase {
  constructor(
    private _hostRepository: IHostRepository,
    private _hostGoogleSignupRepository: IHostGoogleSignupRepository,
    private _tokenService: ITokenService
  ) {}

  async hostGoogleSignup(data: googleSignupHostDTO): Promise<HostDetailsDTO> {
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
        location: data.location || "",
        profilePic: data.profilePic || "",
        role: "host",
      };
      host = await this._hostGoogleSignupRepository.createHost(newHost);
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
