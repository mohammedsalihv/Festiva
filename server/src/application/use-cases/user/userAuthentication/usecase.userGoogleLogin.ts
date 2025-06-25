import CustomError from "../../../../utils/common/errors/CustomError";
import { IUserGoogleRepository } from "../../../../domain/entities/repositoryInterface/user/authentication/interface.userGoogleRepository";
import { TokenService } from "../../../tokenService/service.token";
import { UserDetailsDTO } from "../../../../types/DTO/user/dto.user";
import { statusCodes } from "../../../../utils/common/messages/constantResponses";

export class UserGoogleLoginUseCase {
  constructor(
    private userRepository: IUserGoogleRepository,
    private tokenService: TokenService
  ) {}

  async execute(
    firstname: string,
    googleId: string,
    email: string
  ): Promise<UserDetailsDTO> {
    let user = await this.userRepository.findByEmail(email);

    if (user) {
      if (!user.googleId) {
        user = await this.userRepository.updateUser(user.id!, {
          googleId,
          isActive: true,
        });

        if (!user) {
          throw new CustomError(
            "Failed to update user with Google ID",
            statusCodes.serverError
          );
        }
      }

      if (!user.isActive) {
        throw new CustomError("User is not active", statusCodes.forbidden);
      }
    }

    user = await this.userRepository.createUser({
      email,
      firstname,
      lastname: "",
      profilePic: "",
      phone: "",
      googleId,
      isActive: true,
      isBlocked: false,
      timestamp: new Date(),
      role: "user",
    });

    const accessToken = this.tokenService.generateAccessToken({
      id: user.id!,
      role: user.role,
    });

    const refreshToken = this.tokenService.generateRefreshToken({
      id: user.id!,
      role: user.role,
    });

    const userResponse = {
      id: user.id!,
      firstname: user.firstname ?? "",
      lastname: user.lastname ?? "",
      phone: user.phone || "",
      email: user.email ?? "",
      profilePic: user.profilePic || "",
      role: user.role || "user",
      isActive: user.isActive ?? true,
      isBlocked: user.isBlocked ?? false,
      timestamp: user.timestamp,
    };

    return {
      accessToken,
      refreshToken,
      user: userResponse,
    };
  }
}
