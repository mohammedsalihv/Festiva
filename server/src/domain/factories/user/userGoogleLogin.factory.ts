import { IUserModel } from "../../entities/databaseModelInterfaces/userModelInterfaces/interface.user";
import { googleLoginUserDTO } from "../../../types/DTO's/userDTO's/dto.hostGoogleLogin";

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
