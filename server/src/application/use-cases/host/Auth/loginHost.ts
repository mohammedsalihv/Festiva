import { IhostRepository } from "../../../../domain/entities/repositoryInterface/host/hostLoginRepository.interface";
import CustomError from "../../../../utils/errorHandler";
import { TokenService } from "../../../services/service.token";
import bcrypt from "bcrypt";

export class LoginHost {
  constructor(private hostRepository: IhostRepository) {}

  async execute(
    email: string,
    password: string
  ): Promise<{
    accessToken: string;
    refreshToken: string;
    host: {
      name: string;
      email: string;
      id: string;
      role: string;
    };
  }> {
    if (!email || !password) {
      throw new CustomError("All fields are required", 400);
    }

    const host = await this.hostRepository.findByEmail(email); // ✅ await
    if (!host) {
      throw new CustomError("Invalid email or password", 401);
    }

    const isPasswordValid = host.password
      ? await bcrypt.compare(password, host.password)
      : false;

    if (!isPasswordValid) {
      throw new CustomError("Invalid credentials", 401);
    }

    const accessToken = TokenService.generateAccessToken({
      id: host._id!,
      role: host.role,
    });
    const refreshToken = TokenService.generateRefreshToken({
      id: host._id!,
      role: host.role,
    });

    return {
      accessToken,
      refreshToken,
      host: {
        id: host._id!,
        name: host.name ?? "",
        email: host.email ?? "",
        role: host.role || "host",
      },
    };
  }
}
