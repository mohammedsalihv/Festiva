import { IUserModel } from "../../../domain/entities/modelInterface/user/interface.user";
import { userLoginResponseDTO } from "../../../types/DTO/user/dto.userLogin";
import { USER_ROUTES } from "../../../infrastructure/constants/user.routes";

export class userLoginSanitizer {
  static toUserLoginResponse(user: IUserModel): userLoginResponseDTO {
    return {
      id: user._id,
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
