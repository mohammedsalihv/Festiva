import { Request, Response } from "express";
import { IUserGoogleLoginController } from "../../../../domain/controllerInterfaces/userControllerInterfaces/userAuthenticationControllerInterfaces/interface.userGoogleLoginController";
import { IUserGoogleLoginUseCase } from "../../../../domain/usecaseInterface/user/userAuthenticationUseCaseInterfaces/interface.userGoogleLoginUsecase";
import { toUserGoogleLoginResponseDTO } from "../../../../types/DTO's/userDTO's/dto.hostGoogleLogin";
import { IUserGoogleLoginValidator } from "../../../../domain/validatorInterface/user/interface.userGoogleLoginValidator";
import {
  statusCodes,
  statusMessages,
} from "../../../../utils/baseUtilities/messages/constantResponses";
import logger from "../../../../utils/baseUtilities/messages/logger";

export class UserGoogleLoginController implements IUserGoogleLoginController {
  constructor(
    private _userGoogleLoginUseCase: IUserGoogleLoginUseCase,
    private _validator: IUserGoogleLoginValidator
  ) {}

  async userLogin(req: Request, res: Response): Promise<void> {
    try {
      const { email, firstname, profilePic , phone } = req.body;
      this._validator.validate({
        email,
        firstname: firstname,
        profilePic: profilePic,
        phone:phone
      });

      const { user, accessToken, refreshToken } =
        await this._userGoogleLoginUseCase.execute({
          firstname: firstname,
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
