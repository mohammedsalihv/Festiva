import { Request, Response } from "express";
import { IUserGoogleLoginController } from "../../../../domain/controlInterface/user/userAuthenticationControllerInterfaces/interface.userGoogleLoginController";
import { IUserGoogleLoginUseCase } from "../../../../domain/usecaseInterface/user/userAuthenticationUseCaseInterfaces/interface.userGoogleLoginUsecase";
import { toUserGoogleLoginResponseDTO } from "../../../../types/DTO/user/dto.hostGoogleLogin";
import { IUserGoogleLoginValidator } from "../../../../domain/validatorInterface/user/interface.userGoogleLoginValidator";
import {
  statusCodes,
  statusMessages,
} from "../../../../utils/common/messages/constantResponses";
import logger from "../../../../utils/common/messages/logger";

export class UserGoogleLoginController implements IUserGoogleLoginController {
  constructor(
    private _userGoogleLoginUseCase: IUserGoogleLoginUseCase,
    private _validator: IUserGoogleLoginValidator
  ) {}

  async userLogin(req: Request, res: Response): Promise<void> {
    try {
      const { email, name, profilePic } = req.body;

      this._validator.validate({
        email,
        firstname: name,
        profilePic: profilePic,
      });

      const { user, accessToken, refreshToken } =
        await this._userGoogleLoginUseCase.execute({
          firstname: name,
          email,
          profilePic,
        });

      const userResponse = toUserGoogleLoginResponseDTO(
        user,
        accessToken,
        refreshToken
      );

      res.status(statusCodes.Success).json({
        success: true,
        message: statusMessages.userLoginSuccess,
        ...userResponse,
      });
    } catch (error: any) {
      logger.error("User Google Login Error:", error.message);
      res.status(statusCodes.serverError).json({
        success: false,
        message: error.message || statusMessages.serverError,
      });
    }
  }
}
