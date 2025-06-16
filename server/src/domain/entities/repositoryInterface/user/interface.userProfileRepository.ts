import { profileEditDTO } from "../../../../config/DTO/user/dto.user";
import { responseUserDTO } from "../../../../config/DTO/user/dto.user";

export interface IUserProfileRepository {
  setProfilePic(userId: string, imageFilename: string): Promise<responseUserDTO>;
  profileEdit(userId: string, form: profileEditDTO): Promise<responseUserDTO>;
  changePassword(userId: string, hashedPassword: string): Promise<responseUserDTO>;
}
