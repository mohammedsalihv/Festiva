import { IUserModel } from "../../../domain/entities/modelInterface/user/interface.user";
import { responseUserDTO } from "./dto.user"; // your user DTO

export interface googleLoginUserDTO {
  firstname?: string;
  email: string;
  profilePic?: string;
}

export interface userGoogleLoginResponseDTO {
  id?: string;
  firstname?: string;
  lastname?: string;
  email: string;
  phone?: string;
  profilePic?: string;
  role?: string;
  isActive?: boolean;
  timestamp?: Date;
  isBlocked?: boolean;
}

export interface userGoogleLoginResponseDTO {
  user: {
    id?: string;
    firstname?: string;
    lastname?: string;
    email: string;
    phone?: string;
    profilePic?: string;
    role?: string;
    isActive?: boolean;
    isBlocked?: boolean;
    timestamp?: string | Date;
  };
  accessToken: string;
  refreshToken: string;
}


export const toUserGoogleLoginResponseDTO = (
  user: IUserModel,
  accessToken: string,
  refreshToken: string
): { user: responseUserDTO; accessToken: string; refreshToken: string } => {
  return {
    user: {
      id: user.id?.toString(),
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      phone: user.phone,
      profilePic: user.profilePic,
      role: user.role,
      isBlocked: user.isBlocked,
      isActive: user.isActive,
      timestamp: user.timestamp ? new Date(user.timestamp) : undefined,
    },
    accessToken,
    refreshToken,
  };
};
