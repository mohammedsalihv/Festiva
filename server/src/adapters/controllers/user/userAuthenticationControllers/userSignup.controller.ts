import { Request, Response } from "express";
import { IUserModel } from "../../../../domain/entities/modelInterface/user/interface.user";
import { registerUserDTO } from "../../../../types/DTO/user/dto.user";
import { IUserSignupController } from "../../../../domain/controlInterface/user/userAuthenticationControllerInterfaces/interface.userSignupController";
import { IUserSignupUseCase } from "../../../../domain/usecaseInterface/user/userAuthenticationUseCaseInterfaces/interface.userSignupUseCase";
import { statusCodes } from "../../../../utils/common/messages/constantResponses";
import { userSignupSanitizer } from "../../../../utils/sanitizers/user/userSignupSanitizer";

export class UserSignupController implements IUserSignupController {
  constructor(private userSignupUseCase: IUserSignupUseCase) {}

  async signupByUser(req: Request, res: Response): Promise<void> {
    try {
      const { firstname, lastname, email, phone, password } = req.body;
      const userData: registerUserDTO = {
        firstname,
        lastname,
        email,
        phone,
        password,
      };

      const { user, accessToken, refreshToken } =
        await this.userSignupUseCase.userSignup(userData);
      res.status(statusCodes.Success).json({
        success: true,
        message: "User registered successfully",
        user: userSignupSanitizer.sanitize(user as IUserModel),
        accessToken,
        refreshToken,
      });
    } catch (error: any) {
      res.status(statusCodes.serverError).json({ message: error.message });
    }
  }
}
