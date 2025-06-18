import { Request, Response } from "express";
import { registerUserDTO } from "../../../../types/DTO/user/dto.user";
import { UserSignupUseCase } from "../../../../application/use-cases/user/userAuthentication/usecase.userSignup";
import { statusCodes } from "../../../../utils/common/messages/constantResponses";

export class UserSignupController {
  constructor(private UserSignupUseCase: UserSignupUseCase) {}

  async signup(req: Request, res: Response): Promise<void> {
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
        await this.UserSignupUseCase.execute(userData);
      res.status(statusCodes.Success).json({
        success: true,
        message: "User registered successfully",
        user: {
          id: user.id,
          firstname: user.firstname,
          lastname: user.lastname,
          phone: user.phone,
          email: user.email,
          role: user.role,
        },
        accessToken,
        refreshToken,
      });
    } catch (error: any) {
      res.status(statusCodes.serverError).json({ message: error.message });
    }
  }
}
