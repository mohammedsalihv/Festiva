import { Request, Response } from "express";
import { IUserUseCase } from "../../../../domain/usecaseInterface/user/userBaseUsecaseInterfaces/interface.userUseCase";
import { AuthRequest } from "../../../../domain/controlInterface/common/authentication/authType";
import axios from "axios";
import { resetPasswordDTO } from "../../../../types/DTO/user/dto.user";
import { IUserController } from "../../../../domain/controlInterface/user/userBaseControllerInterfaces/interface.userController";
import { IUserPasswordResetUseCase } from "../../../../domain/usecaseInterface/user/userAuthenticationUseCaseInterfaces/interface.userPasswordResetUseCase";
import { statusCodes } from "../../../../utils/common/messages/constantResponses";
import { getSignedImageUrl } from "../../../../utils/common/cloudinary/getSignedImageUrl";

export class UserController implements IUserController {
  constructor(
    private userPasswordResetUseCase: IUserPasswordResetUseCase,
    private userUsecase: IUserUseCase
  ) {}

  async resetPassword(req: Request, res: Response): Promise<void> {
    try {
      const { email, newPassword } = req.body;
      const userData: resetPasswordDTO = { email, newPassword };

      await this.userPasswordResetUseCase.execute(userData);
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

    const user = await this.userUsecase.findById(userId);
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
