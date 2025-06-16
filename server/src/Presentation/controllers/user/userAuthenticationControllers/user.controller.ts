import { Request, Response } from "express";
import { resetPasswordDTO } from "../../../../config/DTO/user/dto.user";
import { UserPasswordResetUseCase } from "../../../../application/use-cases/user/userAuthentication/usecase.passwordReset";
import {
  statusCodes,
  statusMessages,
} from "../../../../utils/common/messages/constantResponses";

export class UserController {
  constructor(private UserPasswordResetUseCase: UserPasswordResetUseCase) {}

  async resetPassword(req: Request, res: Response): Promise<void> {
    try {
      const { email, newPassword } = req.body;
      const userData: resetPasswordDTO = { email, newPassword };

      await this.UserPasswordResetUseCase.execute(userData);
      res.status(statusCodes.Success).json({
        success: true,
        message: "Password changed!",
      });
    } catch (error: any) {
      res.status(statusCodes.serverError).json({ message: error.message });
    }
  }
}
