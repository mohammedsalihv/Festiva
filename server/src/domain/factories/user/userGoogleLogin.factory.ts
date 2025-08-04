import { IUserModel } from "../../../domain/entities/modelInterface/user/interface.user";
import { googleLoginUserDTO } from "../../../types/DTO/user/dto.hostGoogleLogin";

export class userGoogleLoginFactory {
  static createNewUser(input: googleLoginUserDTO): Omit<IUserModel, "id"> {
    const { email, firstname, profilePic } = input;

    return {
      email,
      firstname,
      lastname: "",
      profilePic: "",
      phone: "",
      isActive: true,
      isBlocked: false,
      timestamp: new Date(),
      role: "user",
    };
  }
}
