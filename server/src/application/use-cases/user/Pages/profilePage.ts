import { IUserRepository } from "../../../../domain/entities/repositoryInterface/user/loginRepository.interface";
import CustomError from "../../../../utils/errorHandler";
import { TokenService } from "../../../../application/services/service.token";

export class ProfileDataUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(userId: string): Promise<{
    accessToken: string;
    refreshToken: string;
    user: {
      firstname: string;
      lastname: string;
      email: string;
      id: string;
      role: string;
    };
  }> {
    // 1. Fetch user
    const user = await this.userRepository.getUserById(userId);

    if (!user) {
      throw new CustomError("User not found", 404);
    }

    // 2. Check active status
    if (!user.isActive) {
      throw new CustomError("User is blocked. Please contact support.", 403);
    }
    const accessToken = TokenService.generateAccessToken({
      id: user._id!,
      role: user.role,
    });

    const refreshToken = TokenService.generateRefreshToken({
      id: user._id!,
      role: user.role,
    });

    // 4. Return profile info and tokens
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
