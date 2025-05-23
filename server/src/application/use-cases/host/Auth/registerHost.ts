import { hash } from "../../../../utils/passwordHash";
import { RegisterHostDTO } from "../../../../config/DTO/hostDto";
import ErrorHandler from "../../../../utils/CustomError";
import { IHost } from "../../../../domain/entities/modelInterface/host.interface";
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
      location: string;
      profile_pic: string;
      role: string;
    };
  }> {
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
        location: createdHost.location!,
        profile_pic: createdHost.profilePic || "",
        role: createdHost.role || "host",
      },
    };
  }
}
