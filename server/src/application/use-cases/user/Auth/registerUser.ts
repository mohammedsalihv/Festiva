import { hash } from "../../../../utils/passwordHash";
import {
  registerUserDTO,
  UserDetailsDTO,
} from "../../../../config/DTO/user/dto.user";
import ErrorHandler from "../../../../utils/CustomError";
import { IUser } from "../../../../domain/entities/modelInterface/interface.user";
import { TokenService } from "../../../services/service.token";
import { IUserRegisterRepository } from "../../../../domain/entities/repositoryInterface/user/interface.userRegisterRepository";

export class RegisterUser {
  constructor(private userRepository: IUserRegisterRepository) {}

  async execute(userData: registerUserDTO): Promise<UserDetailsDTO> {
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
      id: createdUser.id!,
      role: createdUser.role,
    });
    const refreshToken = TokenService.generateRefreshToken({
      id: createdUser.id!,
      role: createdUser.role,
    });

    return {
      accessToken,
      refreshToken,
      user: {
        id: createdUser.id!,
        firstname: createdUser.firstname!,
        lastname: createdUser.lastname!,
        email: createdUser.email!,
        phone: createdUser.phone!,
        role: createdUser.role || "user",
        profilePic: createdUser.profilePic,
        isBlocked: createdUser.isBlocked,
        isActive: createdUser.isActive,
        timestamp: createdUser.timestamp,
      },
    };
  }
}
