import CustomError from "../../../../utils/CustomError";
import { IUserGoogleRepository } from "../../../../domain/entities/repositoryInterface/user/interface.googleRepository";
import { TokenService } from "../../../services/service.token";
import logger from "../../../../utils/logger"; // Assuming you have this

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
      id: string;
      firstname: string;
      lastname: string;
      phone: string;
      email: string;
      profilePic: string;
      role: string;
      isBlocked: boolean;
      isActive: boolean;
      timestamp?: Date;
    };
  }> {
    logger.info("Executing GoogleLogin for email:", email);
    let user = await this.userRepository.findByEmail(email);
    logger.info("User found by email:", user);

    if (user) {
      if (!user.googleId) {
        logger.info("Updating user with Google ID:", { googleId, userId: user._id });
        user = await this.userRepository.updateUser(user._id!, {
          googleId,
          isActive: true,
        });

        if (!user) {
          logger.error("Failed to update user with Google ID");
          throw new CustomError("Failed to update user with Google ID", 500);
        }
        logger.info("User updated:", user);
      }

      if (!user.isActive) {
        logger.warn("User is not active:", user._id);
        throw new CustomError("User is not active", 403);
      }
    } else {
      logger.info("Creating new user:", { email, firstname, googleId });
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
      logger.info("New user created:", user);
    }

    logger.info("Generating tokens for user:", { id: user._id, role: user.role });
    const accessToken = TokenService.generateAccessToken({
      id: user._id!,
      role: user.role,
    });

    const refreshToken = TokenService.generateRefreshToken({
      id: user._id!,
      role: user.role,
    });
    logger.info("Tokens generated:", { accessToken, refreshToken });

    const userResponse = {
      id: user._id!,
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
    logger.info("Returning user response:", userResponse);

    return {
      accessToken,
      refreshToken,
      user: userResponse,
    };
  }
}