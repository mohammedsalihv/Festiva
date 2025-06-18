import { hash } from "../../../../utils/common/auth/passwordHash";
import {
  registerHostDTO,
  HostDetailsDTO,
} from "../../../../types/DTO/host/dto.host";
import ErrorHandler from "../../../../utils/common/errors/CustomError";
import { IHost } from "../../../../domain/entities/modelInterface/interface.host";
import { TokenService } from "../../../tokenService/service.token";
import { IHostSignupRepository } from "../../../../domain/entities/repositoryInterface/host/interface.hostSignupRepository";
import { IHostRepository } from "../../../../domain/entities/repositoryInterface/host/interface.hostRepository";
import { statusCodes } from "../../../../utils/common/messages/constantResponses";

export class HostSignupUseCase {
  constructor(
    private hostSignupRepository: IHostSignupRepository,
    private hostRepository: IHostRepository,
    private tokenService: TokenService
  ) {}

  async execute(hostData: registerHostDTO): Promise<HostDetailsDTO> {
    const { email, password } = hostData;
    const existingHost = await this.hostRepository.findByEmail(email);
    if (existingHost)
      throw new ErrorHandler("Email already exists", statusCodes.forbidden);

    const hashedPassword = await hash(password);
    const newHost: IHost = {
      name: hostData.name || "",
      email: hostData.email,
      password: hashedPassword,
      phone: hostData.phone || "",
      role: "host",
      location: hostData.location,
      profilePic: hostData.profilePic,
    };

    const createdHost = await this.hostSignupRepository.createHost(newHost);
    const accessToken = this.tokenService.generateAccessToken({
      id: createdHost.id!,
      role: createdHost.role,
    });
    const refreshToken = this.tokenService.generateRefreshToken({
      id: createdHost.id!,
      role: createdHost.role,
    });

    return {
      accessToken,
      refreshToken,
      host: {
        id: createdHost.id!,
        name: createdHost.name!,
        email: createdHost.email!,
        phone: createdHost.phone!,
        location: createdHost.location!,
        profilePic: createdHost.profilePic || "",
        role: createdHost.role || "host",
      },
    };
  }
}
