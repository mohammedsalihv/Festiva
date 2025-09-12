import { IUserModel } from "../../../domain/entities/databaseModelInterfaces/userModelInterfaces/interface.user";

export class userSignupSanitizer {
  static sanitize(user: IUserModel) {
    return {
      id: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      phone: user.phone,
      email: user.email,
      role: user.role,
      profilePic: user.profilePic || null,
    };
  }
}
