import { IUserModel } from "../../../domain/entities/databaseModelInterfaces/userModelInterfaces/interface.user";
import { userLoginResponseDTO } from "../../../types/DTO's/userDTO's/userAuthenticationDTO's/dto.userLogin";

export class userLoginSanitizer {
  static toUserLoginResponse(user: IUserModel): userLoginResponseDTO {
    return {
      id: (user as any)._id?.toString() || (user as any).id?.toString(),
      firstname: user.firstname,
      lastname: user.lastname,
      phone: user.phone,
      email: user.email,
      role: user.role,
      profilePic: user.profilePic,
      isBlocked: user.isBlocked,
      isActive: user.isActive,
      timestamp: user.timestamp,
    };
  }
}
