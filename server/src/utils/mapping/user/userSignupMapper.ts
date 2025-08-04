import { userDetailsDTO } from "../../../types/DTO/user/dto.user";
import { IUserModel } from "../../../domain/entities/modelInterface/user/interface.user";

export class userSignupMapper {
  static toDTO(user: IUserModel): userDetailsDTO["user"] {
    return {
      id: user.id!,
      firstname: user.firstname ?? "",
      lastname: user.lastname ?? "",
      email: user.email ?? "",
      phone: user.phone ?? "",
      role: user.role ?? "user",
      profilePic: user.profilePic ?? "",
      isBlocked: user.isBlocked ?? false,
      isActive: user.isActive ?? true,
      timestamp: user.timestamp ? new Date(user.timestamp) : undefined,
    };
  }
}
