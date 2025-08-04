export interface userLoginResponseDTO {
  id?: string;
  firstname?: string;
  lastname?: string;
  email: string;
  phone?: string;
  profilePic?: string;
  role?: string;
  isActive?: boolean;
  timestamp?: string | Date;
  isBlocked?: boolean;
}
