import { hash } from "../../../../utils/common/auth/passwordHash";
import {
  registerUserDTO,
  userDetailsDTO,
} from "../../../../types/DTO/user/dto.user";
import { userSignupFactory } from "../../../../domain/factories/user/userSignup.factory";
import { IUserSignupUseCase } from "../../../../domain/usecaseInterface/user/userAuthenticationUseCaseInterfaces/interface.userSignupUseCase";
import ErrorHandler from "../../../../utils/common/errors/CustomError";
import { ITokenService } from "../../../../domain/entities/baseInterface/authenticationInterfaces/interface.tokenService";
import { IUserSignupRepository } from "../../../../domain/entities/repositoryInterface/user/authentication/interface.userSignupRepository";
import { userSignupMapper } from "../../../../utils/mapping/user/userSignupMapper";
import {
  statusCodes,
  statusMessages,
} from "../../../../utils/common/messages/constantResponses";

export class UserSignupUseCase implements IUserSignupUseCase {
  constructor(
    private userSignupRepository: IUserSignupRepository,
    private tokenService: ITokenService
  ) {}

  async userSignup(userData: registerUserDTO): Promise<userDetailsDTO> {
    const { email, password } = userData;

    const existingUser = await this.userSignupRepository.findByEmail(email);
    if (existingUser) {
      throw new ErrorHandler(
        statusMessages.accountExisted,
        statusCodes.conflict
      );
    }

    const hashedPassword = await hash(password);

    const newUser = userSignupFactory.createNewUser(userData, hashedPassword);

    const createdUser = await this.userSignupRepository.createUser(newUser);

    const accessToken = this.tokenService.generateAccessToken({
      id: createdUser._id!,
      role: createdUser.role,
    });

    const refreshToken = this.tokenService.generateRefreshToken({
      id: createdUser._id!,
      role: createdUser.role,
    });

    return {
      accessToken,
      refreshToken,
      user: userSignupMapper.toDTO(createdUser),
    };
  }
}