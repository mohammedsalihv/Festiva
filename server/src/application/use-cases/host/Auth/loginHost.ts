import { IHostLoginRepository } from "../../../../domain/entities/repositoryInterface/host/interface.hostLoginRepository";
import { IHostRepository } from "../../../../domain/entities/repositoryInterface/host/interface.hostRepository";
import CustomError from "../../../../utils/common/errors/CustomError";
import { TokenService } from "../../../services/service.token";
import bcrypt from "bcrypt";
import { HostDetailsDTO } from "../../../../config/DTO/host/dto.host";

export class LoginHost {
  constructor(
    private HostLoginRepository: IHostLoginRepository,
    private HostRepository: IHostRepository
  ) {}

  async execute(email: string, password: string): Promise<HostDetailsDTO> {
    if (!email || !password) {
      throw new CustomError("All fields are required", 400);
    }

    const host = await this.HostLoginRepository.findByEmail(email);
    if (!host) {
      throw new CustomError("Invalid email or password", 401);
    }

    const hostValidate = await this.HostRepository.findByEmail(email);
    if (!hostValidate) {
      throw new CustomError("Host not found", 404);
    }

    const isPasswordValid = hostValidate.password
      ? await bcrypt.compare(password, hostValidate.password)
      : false;

    if (!isPasswordValid) {
      throw new CustomError("Invalid credentials", 401);
    }

    const accessToken = TokenService.generateAccessToken({
      id: host.id!,
      role: host.role,
    });
    const refreshToken = TokenService.generateRefreshToken({
      id: host.id!,
      role: host.role,
    });

    return {
      accessToken,
      refreshToken,
      host: {
        id: host.id!,
        name: host.name ?? "",
        email: host.email ?? "",
        phone: host.phone ?? "",
        role: host.role || "host",
        location: host.location ?? "",
        profilePic: host.profilePic ?? "",
      },
    };
  }
}
