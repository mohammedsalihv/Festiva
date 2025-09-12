import { hash } from "../../../../utils/baseUtilities/auth/passwordHash";
import { IHostSignupUseCase } from "../../../../domain/usecaseInterface/host/authenticationUsecaseInterfaces/interface.hostSignupUseCase";
import {
  registerHostDTO,
  HostDetailsDTO,
} from "../../../../types/DTO's/hostDTO's/hostBaseDTO's/dto.host";
import ErrorHandler from "../../../../utils/baseUtilities/errors/CustomError";
import { IHostModel } from "../../../../domain/entities/databaseModelInterfaces/hostModelInterfaces/interface.host";
import { ITokenService } from "../../../../domain/entities/baseInterface/authenticationInterfaces/interface.tokenService";
import { IHostSignupRepository } from "../../../../domain/entities/repositoryInterface/host/auth repository interface/interface.hostSignupRepository";
import { IHostRepository } from "../../../../domain/entities/repositoryInterface/host/hostBaseRepositoryInterfaces/interface.hostRepository";
import { statusCodes } from "../../../../utils/baseUtilities/messages/constantResponses";

export class HostSignupUseCase implements IHostSignupUseCase {
  constructor(
    private hostSignupRepository: IHostSignupRepository,
    private hostRepository: IHostRepository,
    private tokenService: ITokenService
  ) {}

  async hostSignup(hostData: registerHostDTO): Promise<HostDetailsDTO> {
    const { email, password } = hostData;
    const existingHost = await this.hostRepository.findByEmail(email);
    if (existingHost)
      throw new ErrorHandler("Email already exists", statusCodes.forbidden);

    const hashedPassword = await hash(password);
    const newHost: IHostModel = {
      name: hostData.name || "",
      email: hostData.email,
      password: hashedPassword,
      phone: hostData.phone || "",
      role: "host",
      signupMethod: hostData.signupMethod || "manual",
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
