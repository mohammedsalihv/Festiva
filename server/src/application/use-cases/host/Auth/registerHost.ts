import { hash } from "../../../../utils/passwordHash";
import {
  registerHostDTO,
  HostDetailsDTO,
} from "../../../../config/DTO/host/dto.host";
import ErrorHandler from "../../../../utils/CustomError";
import { IHost } from "../../../../domain/entities/modelInterface/interface.host";
import { TokenService } from "../../../services/service.token";
import { IHostRegisterRepository } from "../../../../domain/entities/repositoryInterface/host/interface.hostRegisterRepository";
import { IHostRepository } from "../../../../domain/entities/repositoryInterface/host/interface.hostRepository";

export class RegsiterHost {
  constructor(
    private hostRegisterRepository: IHostRegisterRepository,
    private hostRepository: IHostRepository
  ) {}

  async execute(hostData: registerHostDTO): Promise<HostDetailsDTO> {
    const { email, password } = hostData;
    const existingHost = await this.hostRepository.findByEmail(email);
    if (existingHost) throw new ErrorHandler("Email already exists", 400);

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

    const createdHost = await this.hostRegisterRepository.createHost(newHost);
    const accessToken = TokenService.generateAccessToken({
      id: createdHost.id!,
      role: createdHost.role,
    });
    const refreshToken = TokenService.generateRefreshToken({
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
