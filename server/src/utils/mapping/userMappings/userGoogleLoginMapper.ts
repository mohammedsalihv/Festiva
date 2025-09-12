import { userLoginResponseDTO } from "../../../types/DTO's/userDTO's/userAuthenticationDTO's/dto.userLogin";
import { IUserModel } from "../../../domain/entities/databaseModelInterfaces/userModelInterfaces/interface.user";

export const toUserGoogleLoginUsecaseDTO = (user: IUserModel): userLoginResponseDTO => ({
  id: user._id ?? "",
  firstname: user.firstname ?? "",
  lastname: user.lastname ?? "",
  phone: user.phone ?? "",
  email: user.email ?? "",
  profilePic: user.profilePic ?? "",
  role: user.role ?? "user",
  isActive: user.isActive ?? true,
  isBlocked: user.isBlocked ?? false,
  timestamp: user.timestamp,
});
