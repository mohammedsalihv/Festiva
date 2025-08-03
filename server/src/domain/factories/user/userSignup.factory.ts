import { IUserModel } from "../../entities/modelInterface/user/interface.user";
import { userSignupDTO } from "../../../types/DTO/user/dto.userSignup";

export class userSignupFactory {
  static createNewUser(
    data: userSignupDTO,
    hashedPassword: string
  ): IUserModel {
    return {
      firstname: data.firstname ?? "Unknown",
      lastname: data.lastname ?? "",
      email: data.email,
      password: hashedPassword,
      phone: data.phone ?? "",
      role: "user",
      isActive: true,
      isBlocked: false,
      timestamp: new Date(),
    };
  }
}