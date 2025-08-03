export interface responseUserDTO {
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

export interface responseAllUsersDTO {
  data: responseUserDTO[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
}

export interface registerUserDTO {
  firstname: string;
  lastname: string;
  email: string;
  phone?: string;
  password: string;
}

export interface resetPasswordDTO {
  email: string;
  newPassword: string;
}

export interface userDetailsDTO {
  user: {
    id: string;
    firstname: string;
    lastname: string;
    phone: string;
    email: string;
    profilePic?: string;
    role: string;
    isBlocked?: boolean;
    isActive?: boolean;
    timestamp?: Date;
  };
  accessToken: string;
  refreshToken: string;
}

export interface profileEditDTO {
  firstname: string;
  lastname: string;
  email?: string;
  phone?: string;
}

export interface changePasswordDTO {
  currentPassword: string;
  newPassword: string;
}

export function toResponseUserDTO(user: any): responseUserDTO {
  return {
    id: user._id.toString(),
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
    phone: user.phone,
    profilePic: user.profilePic,
    role: user.role,
    isActive: user.isActive,
    isBlocked: user.isBlocked,
    timestamp: user.timestamp,
  };
}
