import CustomError from "../../../../utils/CustomError";
import { TokenService } from "../../../services/service.token";
import { IUserGoogleRepository } from "../../../../domain/entities/repositoryInterface/user/interface.googleRepository";

export class GoogleLogin {
  constructor(private userRepository: IUserGoogleRepository) {}

  async execute(
    firstname: string,
    googleId: string,
    email: string
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
    let user = await this.userRepository.findByEmail(email);

    if (user) {
      if (!user.googleId) {
        user = await this.userRepository.updateUser(user._id!, {
          googleId,
          isActive: true,
        });
      }

      if (!user?.isActive) {
        throw new CustomError("User is not active", 403);
      }
    } else {
      user = await this.userRepository.createUser({
        email,
        firstname,
        lastname:"",
        profilePic:"",
        phone:"",
        googleId,
        isActive: true,
        isBlocked:false,
        timestamp:new Date(),
        role: "user",
      });
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
