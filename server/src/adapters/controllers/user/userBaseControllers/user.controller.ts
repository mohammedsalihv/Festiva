import { Request, Response } from "express";
import axios from "axios";
import { IUserUseCase } from "../../../../domain/usecaseInterfaces/userUsecaseInterfaces/userBaseUsecaseInterfaces/interface.userUseCase";
import { AuthRequest } from "../../../../domain/controllerInterfaces/baseControllerInterfaces/baseAuthenticationInterfaces/authType";
import { resetPasswordDTO } from "../../../../types/DTO's/userDTO's/userBaseDTO's/dto.user";
import { IUserController } from "../../../../domain/controllerInterfaces/userControllerInterfaces/userBaseControllerInterfaces/interface.userController";
import { IUserPasswordResetUseCase } from "../../../../domain/usecaseInterfaces/userUsecaseInterfaces/userAuthenticationUseCaseInterfaces/interface.userPasswordResetUseCase";
import { statusCodes } from "../../../../utils/baseUtilities/messages/constantResponses";
import { getSignedImageUrl } from "../../../../utils/baseUtilities/cloudinary/getSignedImageUrl";

export class UserController implements IUserController {
  constructor(
    private _userPasswordResetUseCase: IUserPasswordResetUseCase,
    private _userUsecase: IUserUseCase
  ) {}

  async resetPassword(req: Request, res: Response): Promise<void> {
    try {
      const { email, newPassword } = req.body;
      const userData: resetPasswordDTO = { email, newPassword };

      await this._userPasswordResetUseCase.execute(userData);
      res.status(statusCodes.Success).json({
        success: true,
        message: "Password changed!",
      });
    } catch (error: any) {
      res.status(statusCodes.serverError).json({ message: error.message });
    }
  }

  async profileImage(req: AuthRequest, res: Response): Promise<void> {
    const userId = req.params.userId;
    const requestingUserId = req.auth?.id;

    if (userId !== requestingUserId) {
      res.status(403).json({ message: "Forbidden" });
      return;
    }

    const user = await this._userUsecase.findById(userId);
    if (!user || !user.profilePic) {
      res.status(statusCodes.notfound).json({ message: "Image not found" });
      return;
    }

    try {
      const signedUrl = getSignedImageUrl(
        user.profilePic,
        { width: 300, height: 300, crop: "fill" },
        60
      );
      const imageResponse = await axios.get(signedUrl, {
        responseType: "arraybuffer",
      });

      res.setHeader("Content-Type", "image/jpeg");
      res.send(imageResponse.data);
    } catch (error) {
      res
        .status(statusCodes.serverError)
        .json({ message: "Error fetching profile image" });
    }
  }
}
