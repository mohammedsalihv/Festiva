import { IUserGoogleLoginRepository } from "../../../../domain/entities/repositoryInterface/user/authentication/interface.userGoogleLoginRepository";
import { IUserGoogleLoginUseCase } from "../../../../domain/usecaseInterface/user/userAuthenticationUseCaseInterfaces/interface.userGoogleLoginUsecase";
import { IUserGoogleLoginValidator } from "../../../../domain/validatorInterface/user/interface.userGoogleLoginValidator";
import { ITokenService } from "../../../../domain/entities/baseInterface/authenticationInterfaces/interface.tokenService";
import { toUserGoogleLoginUsecaseDTO } from "../../../../utils/mapping/user/userGoogleLoginMapper";
import { userGoogleLoginFactory } from "../../../../domain/factories/user/userGoogleLogin.factory";
import { userGoogleLoginResponseDTO } from "../../../../types/DTO/user/dto.hostGoogleLogin";
import { googleLoginUserDTO } from "../../../../types/DTO/user/dto.hostGoogleLogin";
import { statusCodes } from "../../../../utils/common/messages/constantResponses";
import CustomError from "../../../../utils/common/errors/CustomError";
import { IUserModel } from "../../../../domain/entities/modelInterface/user/interface.user";

export class UserGoogleLoginUseCase implements IUserGoogleLoginUseCase {
  constructor(
    private _userGoogleLoginRepository: IUserGoogleLoginRepository,
    private _tokenService: ITokenService,
    private _validator: IUserGoogleLoginValidator
  ) {}

  async execute(data: googleLoginUserDTO): Promise<userGoogleLoginResponseDTO> {
    this._validator.validate(data);

    const { email, firstname } = data;

    let user: IUserModel | null =
      await this._userGoogleLoginRepository.findByEmail(email);

    if (user) {
      if (!user.email) {
        user = await this._userGoogleLoginRepository.updateUser(user.id!, {
          firstname,
          isActive: true,
        });

        if (!user) {
          throw new CustomError(
            "Failed to update user with Google",
            statusCodes.serverError
          );
        }
      }

      if (!user.isActive) {
        throw new CustomError("User is not active", statusCodes.forbidden);
      }
    } else {
      const newUser = userGoogleLoginFactory.createNewUser(data);
      user = await this._userGoogleLoginRepository.createUser(newUser);
    }

    const accessToken = this._tokenService.generateAccessToken({
      id: user.id!,
      role: user.role,
    });

    const refreshToken = this._tokenService.generateRefreshToken({
      id: user.id!,
      role: user.role,
    });

    return {
      accessToken,
      refreshToken,
      user: toUserGoogleLoginUsecaseDTO(user),
    };
  }
}
