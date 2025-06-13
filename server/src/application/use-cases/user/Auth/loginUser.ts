import { IUserLoginRepository } from "../../../../domain/entities/repositoryInterface/user/interface.loginRepository";
import CustomError from "../../../../utils/common/errors/CustomError";
import { TokenService } from "../../../../application/services/service.token";
import bcrypt from "bcrypt";
import { UserDetailsDTO } from "../../../../config/DTO/user/dto.user";
import { IUserRepository } from "../../../../domain/entities/repositoryInterface/user/interface.userRepository";

export class LoginUser {
  constructor(
    private userLoginRepository: IUserLoginRepository,
    private userRepository: IUserRepository
  ) {}

  async execute(email: string, password: string): Promise<UserDetailsDTO> {
    const user = await this.userLoginRepository.findByEmail(email);
    if (!user) {
      throw new CustomError("User not found", 401);
    }

    if (user.isBlocked) {
      throw new CustomError(
        "Account has been blocked. Please contact support.",
        403
      );
    }

    const userValidation = await this.userRepository.findByEmail(email);
    if (!userValidation) {
      throw new CustomError("User not found", 401);
    }

    const isPasswordValid = userValidation.password
      ? await bcrypt.compare(password, userValidation.password)
      : false;

    if (!isPasswordValid) {
      throw new CustomError("Invalid credentials", 401);
    }

    const accessToken = TokenService.generateAccessToken({
      id: user.id!,
      role: user.role,
    });
    const refreshToken = TokenService.generateRefreshToken({
      id: user.id!,
      role: user.role,
    });

    return {
      accessToken,
      refreshToken,
      user: {
        id: user.id!,
        firstname: user.firstname ?? "",
        lastname: user.lastname ?? "",
        email: user.email ?? "",
        phone: user.phone || "",
        profilePic: user.profilePic || "",
        role: user.role || "user",
        isActive: user.isActive || true,
        isBlocked: user.isBlocked || false,
        timestamp: user.timestamp,
      },
    };
  }
}
