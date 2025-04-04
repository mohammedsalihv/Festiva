import { IUserRepository } from "../../../../domain/entities/repositoryInterface/user/loginRepository.interface";
import CustomError  from "../../../../utils/errorHandler";
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
      lastname : string;
      email: string;
      id: string;
      role: string
    };
  }> {
    if (!email || !password) {
      throw new CustomError("All fields are required", 400);
    }

    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new CustomError("Invalid email or password", 401);
    }

    if (!user.isActive) {
      throw new CustomError("User is blocked. Please contact support.", 403);
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
          firstname: user.firstname,
          lastname: user.lastname ?? "",
          email: user.email,
          role: user.role || "user",
        },
      };
  }
}
