import { IUserRepository } from "../../../../domain/entities/repositoryInterface/user/interface.loginRepository";
import CustomError from "../../../../utils/CustomError";
import { TokenService } from "../../../../application/services/service.token";
import bcrypt from "bcrypt";

export class LoginUser {
  constructor(private userRepository: IUserRepository) {}

  async execute(
    email: string,
    password: string
  ): Promise<{
    accessToken: string;
    refreshToken: string;
    user: {
      firstname: string;
      lastname: string;
      phone: string;
      email: string;
      profilePic: string;
      id: string;
      role: string;
      isBlocked: boolean;
      isActive: boolean;
      timestamp?: Date;
    };
  }> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new CustomError("User not found", 401);
    }

    if (user.isBlocked) {
      throw new CustomError(
        "Account has been blocked. Please contact support.",
        403
      );
    }

    const isPasswordValid = user.password
      ? await bcrypt.compare(password, user.password)
      : false;

    if (!isPasswordValid) {
      throw new CustomError("Invalid credentials", 401);
    }

    const accessToken = TokenService.generateAccessToken({
      id: user._id!,
      role: user.role,
    });
    const refreshToken = TokenService.generateRefreshToken({
      id: user._id!,
      role: user.role,
    });

    return {
      accessToken,
      refreshToken,
      user: {
        id: user._id!,
        firstname: user.firstname ?? "",
        lastname: user.lastname ?? "",
        email: user.email ?? "",
        phone: user.phone || "Please add contact details",
        profilePic: user.profilePic || "",
        role: user.role || "user",
        isActive: user.isActive || true,
        isBlocked: user.isBlocked || false,
        timestamp: user.timestamp,
      },
    };
  }
}
