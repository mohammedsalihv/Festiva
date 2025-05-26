import { Request, Response } from "express";
import { resetPasswordDTO } from "../../../../config/DTO/user/dto.user";
import { ResetPassword } from "../../../../application/use-cases/user/Auth/resetPassowrd";

export class UserController {
  constructor(private userController: ResetPassword) {}

  async resetPassword(req: Request, res: Response): Promise<void> {
    try {
      const { email, newPassword } = req.body;
      const userData: resetPasswordDTO = { email, newPassword };

      await this.userController.execute(userData);
      res.status(200).json({
        success: true,
        message: "Password changed!",
      });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}
