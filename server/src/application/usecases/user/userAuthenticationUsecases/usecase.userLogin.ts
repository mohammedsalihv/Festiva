import { IUserLoginRepository } from "../../../../domain/entities/repositoryInterface/user/authentication/interface.userLoginRepository";
import { IUserLoginUseCase } from "../../../../domain/usecaseInterface/user/userAuthenticationUseCaseInterfaces/interface.userLoginUseCase";
import { IUserRepository } from "../../../../domain/entities/repositoryInterface/user/account/interface.userRepository";
import { TokenService } from "../../../tokenService/service.token";
import { userDetailsDTO } from "../../../../types/DTO/user/dto.user";
import { IUserLoginValidator } from "../../../../domain/validatorInterface/user/interface.userLoginValidator";
import { userLoginMapper } from "../../../../utils/mapping/user/userLoginMapper";

export class UserLoginUseCase implements IUserLoginUseCase {
  constructor(
    private userLoginRepository: IUserLoginRepository,
    private userRepository: IUserRepository,
    private tokenService: TokenService,
    private validator: IUserLoginValidator
  ) {}

  async userLogin(email: string, password: string): Promise<userDetailsDTO> {
    const user = await this.userLoginRepository.findByEmail(email);
    this.validator.validateUserExistence(user);
    this.validator.validateUserBlocked(user);

    const userValidation = await this.userRepository.findByEmail(email);
    this.validator.validateUserExistence(userValidation);

    await this.validator.validatePassword(userValidation!.password!, password);

    const accessToken = this.tokenService.generateAccessToken({
      id: user.id!,
      role: user.role,
    });

    const refreshToken = this.tokenService.generateRefreshToken({
      id: user.id!,
      role: user.role,
    });

    return userLoginMapper.toUserDetailsDTO(user, accessToken, refreshToken);
  }
}
