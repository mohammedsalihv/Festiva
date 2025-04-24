import { hash } from "../../../../utils/passwordHash";
import { RegisterHostDTO } from "../../../../config/DTO/hostDto";
import ErrorHandler from "../../../../utils/errorHandler";
import { Ihost } from "../../../../domain/entities/modelInterface/host.interface";
import { TokenService } from "../../../services/service.token";
import { IHostRepository } from "../../../../domain/entities/repositoryInterface/host/hostRepository.interface";

export class RegsiterHost {
  constructor(private hostRepository: IHostRepository) {}

  async execute(hostData: RegisterHostDTO): Promise<{
    accessToken: string;
    refreshToken: string;
    host: {
      id: string;
      name: string;
      email: string;
      phone: string;
      role: string;
    };
  }> {
    const { email, password } = hostData;
    const existingHost = await this.hostRepository.findByEmail(email);
    if (existingHost) throw new ErrorHandler("Email already exists", 400);
    const hashedPassword = await hash(password);
    const newHost: Ihost = {
      name: hostData.name || "",
      email: hostData.email,
      password: hashedPassword,
      phone: hostData.phone || "",
      profile_pic: "",
      role: "host",
      isActive: true,
      timestamp: new Date(),
      is_blocked: false,
    };

    const createdHost = await this.hostRepository.createHost(newHost);
    const accessToken = TokenService.generateAccessToken({
      id: createdHost._id!,
      role: createdHost.role,
    });
    const refreshToken = TokenService.generateRefreshToken({
      id: createdHost._id!,
      role: createdHost.role,
    });

    return {
      accessToken,
      refreshToken,
      host: {
        id: createdHost._id!,
        name: createdHost.name!,
        email: createdHost.email!,
        phone: createdHost.phone!,
        role: createdHost.role || "user" || "host",
      },
    };
  }
}
