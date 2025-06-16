import { hash } from "../../../../utils/common/auth/passwordHash";
import {
  registerUserDTO,
  UserDetailsDTO,
} from "../../../../config/DTO/user/dto.user";
import ErrorHandler from "../../../../utils/common/errors/CustomError";
import { IUser } from "../../../../domain/entities/modelInterface/interface.user";
import { TokenService } from "../../../tokenService/service.token";
import { IUserSignupRepository } from "../../../../domain/entities/repositoryInterface/user/interface.userSignupRepository";
import {
  statusCodes,
  statusMessages,
} from "../../../../utils/common/messages/constantResponses";

export class UserSignupUseCase {
  constructor(
    private userSignupRepository: IUserSignupRepository,
    private tokenService: TokenService
  ) {}

  async execute(userData: registerUserDTO): Promise<UserDetailsDTO> {
    const { email, password } = userData;

    const existingUser = await this.userSignupRepository.findByEmail(email);
    if (existingUser) {
      throw new ErrorHandler(
        statusMessages.accountExisted,
        statusCodes.conflict
      );
    }

    const hashedPassword = await hash(password);

    const newUser: IUser = {
      firstname: userData.firstname ?? "Unknown",
      lastname: userData.lastname ?? "",
      email,
      password: hashedPassword,
      phone: userData.phone ?? "",
      role: "user",
      isActive: true,
      isBlocked: false,
      timestamp: new Date(),
    };

    const createdUser = await this.userSignupRepository.createUser(newUser);

    const accessToken = this.tokenService.generateAccessToken({
      id: createdUser.id!,
      role: createdUser.role,
    });

    const refreshToken = this.tokenService.generateRefreshToken({
      id: createdUser.id!,
      role: createdUser.role,
    });

    return {
      accessToken,
      refreshToken,
      user: {
        id: createdUser.id!,
        firstname: createdUser.firstname!,
        lastname: createdUser.lastname!,
        email: createdUser.email!,
        phone: createdUser.phone!,
        role: createdUser.role!,
        profilePic: createdUser.profilePic,
        isBlocked: createdUser.isBlocked,
        isActive: createdUser.isActive,
        timestamp: createdUser.timestamp,
      },
    };
  }
}
