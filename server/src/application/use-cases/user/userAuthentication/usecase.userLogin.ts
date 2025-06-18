import { IUserLoginRepository } from "../../../../domain/entities/repositoryInterface/user/interface.userLoginRepository";
import CustomError from "../../../../utils/common/errors/CustomError";
import { TokenService } from "../../../tokenService/service.token";
import bcrypt from "bcrypt";
import { UserDetailsDTO } from "../../../../types/DTO/user/dto.user";
import { IUserRepository } from "../../../../domain/entities/repositoryInterface/user/interface.userRepository";
import {
  statusCodes,
  statusMessages,
} from "../../../../utils/common/messages/constantResponses";

export class UserLoginUseCase {
  constructor(
    private userLoginRepository: IUserLoginRepository,
    private userRepository: IUserRepository,
    private tokenService: TokenService
  ) {}

  async execute(email: string, password: string): Promise<UserDetailsDTO> {
    const user = await this.userLoginRepository.findByEmail(email);
    if (!user) {
      throw new CustomError(
        statusMessages.accountNotfound,
        statusCodes.notfound
      );
    }

    if (user.isBlocked) {
      throw new CustomError(
        statusMessages.accountBlocked,
        statusCodes.unAuthorized
      );
    }

    const userValidation = await this.userRepository.findByEmail(email);
    if (!userValidation) {
      throw new CustomError(
        statusMessages.accountNotfound,
        statusCodes.notfound
      );
    }

    const isPasswordValid = userValidation.password
      ? await bcrypt.compare(password, userValidation.password)
      : false;

    if (!isPasswordValid) {
      throw new CustomError(
        statusMessages.invalidCredential,
        statusCodes.forbidden
      );
    }

    const accessToken = this.tokenService.generateAccessToken({
      id: user.id!,
      role: user.role,
    });
    const refreshToken = this.tokenService.generateRefreshToken({
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
