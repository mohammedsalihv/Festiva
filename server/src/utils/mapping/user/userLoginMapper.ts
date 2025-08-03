import { userDetailsDTO } from "../../../types/DTO/user/dto.user";

export class userLoginMapper {
  static toUserDetailsDTO(
    user: any,
    accessToken: string,
    refreshToken: string
  ): userDetailsDTO {
    return {
      accessToken,
      refreshToken,
      user: {
        id: user.id!,
        firstname: user.firstname ?? "",
        lastname: user.lastname ?? "",
        email: user.email ?? "",
        phone: user.phone || "",
        profilePic: user.profilePic || "",
        role: user.role || "user",
        isActive: user.isActive || true,
        isBlocked: user.isBlocked || false,
        timestamp: user.timestamp,
      },
    };
  }
}
