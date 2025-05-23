import { hash } from "../../../../utils/passwordHash";
import { RegisterUserDTO } from "../../../../config/DTO/userDtos";
import ErrorHandler from "../../../../utils/CustomError";
import { IUser } from "../../../../domain/entities/modelInterface/user.interface";
import { TokenService } from "../../../services/service.token";
import { IUserRegisterRepository } from "../../../../domain/entities/repositoryInterface/user/interface.userRegisterRepository";

export class RegisterUser {
  constructor(private userRepository: IUserRegisterRepository) {}

  async execute(userData: RegisterUserDTO): Promise<{
    accessToken: string;
    refreshToken: string;
    user: {
      id: string;
      firstname: string;
      lastname: string;
      email: string;
      phone: string;
      role: string;
    };
  }> {
    const { email, password } = userData;

    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) throw new ErrorHandler("User already exists", 400);

    const hashedPassword = await hash(password);

    const newUser: IUser = {
      firstname: userData.firstname || "Unknown",
      lastname: userData.lastname || "",
      email: userData.email,
      password: hashedPassword,
      phone: userData.phone || "",
      role: "user",
      isActive: true,
      isBlocked: false,
      timestamp: new Date(),
    };

    const createdUser = await this.userRepository.createUser(newUser);

    const accessToken = TokenService.generateAccessToken({
      id: createdUser._id!,
      role: createdUser.role,
    });
    const refreshToken = TokenService.generateRefreshToken({
      id: createdUser._id!,
      role: createdUser.role,
    });

    return {
      accessToken,
      refreshToken,
      user: {
        id: createdUser._id!,
        firstname: createdUser.firstname!,
        lastname: createdUser.lastname!, // Add !
        email: createdUser.email!,
        phone: createdUser.phone!,
        role: createdUser.role || "user" || "host",
      },
    };
  }
}
