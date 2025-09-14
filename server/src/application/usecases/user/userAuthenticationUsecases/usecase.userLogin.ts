import { IUserLoginRepository } from "../../../../domain/repositoryInterfaces/userRepositoryInterfaces/userAuthenticationRepositoryInterfaces/interface.userLoginRepository";
import { IUserLoginUseCase } from "../../../../domain/usecaseInterfaces/userUsecaseInterfaces/userAuthenticationUseCaseInterfaces/interface.userLoginUseCase";
import { IUserRepository } from "../../../../domain/repositoryInterfaces/userRepositoryInterfaces/userAccountRepositoryInterfaces/interface.userRepository";
import { ITokenService } from "../../../../domain/baseInterfaces/baseAuthenticationInterfaces/interface.tokenService";
import { userDetailsDTO } from "../../../../types/DTO's/userDTO's/userBaseDTO's/dto.user";
import { IUserLoginValidator } from "../../../../domain/validatorInterfaces/userValidatorInterfaces/interface.userLoginValidator";
import { userLoginMapper } from "../../../../utils/mapping/userMappings/userLoginMapper";

export class UserLoginUseCase implements IUserLoginUseCase {
  constructor(
    private _userLoginRepository: IUserLoginRepository,
    private _userRepository: IUserRepository,
    private _tokenService: ITokenService,
    private _validator: IUserLoginValidator
  ) {}

  async userLogin(email: string, password: string): Promise<userDetailsDTO> {
    const user = await this._userLoginRepository.findByEmail(email);
    this._validator.validateUserExistence(user);
    this._validator.validateUserBlocked(user);

    const userValidation = await this._userRepository.findByEmail(email);
    this._validator.validateUserExistence(userValidation);

    await this._validator.validatePassword(userValidation!.password!, password);

    const accessToken = this._tokenService.generateAccessToken({
      id: user?.id!,
      role: user?.role,
    });

    const refreshToken = this._tokenService.generateRefreshToken({
      id: user?.id!,
      role: user?.role,
    });

    return userLoginMapper.toUserDetailsDTO(user, accessToken, refreshToken);
  }
}
