import { userLoginResponseDTO } from "../../../types/DTO/user/dto.userLogin";
import { IUserModel } from "../../../domain/entities/modelInterface/user/interface.user";

export const toUserGoogleLoginUsecaseDTO = (user: IUserModel): userLoginResponseDTO => ({
  id: user.id ?? "",
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
