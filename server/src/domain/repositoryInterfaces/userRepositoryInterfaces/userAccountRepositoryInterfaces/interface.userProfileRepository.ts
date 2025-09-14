import { userProfileEditDTO } from "../../../../types/DTO's/userDTO's/userBaseDTO's/dto.user";
import { responseUserDTO } from "../../../../types/DTO's/userDTO's/userBaseDTO's/dto.user";

export interface IUserProfileRepository {
  setProfilePic(
    userId: string,
    imageFilename: string
  ): Promise<responseUserDTO>;
  profileEdit(
    userId: string,
    form: userProfileEditDTO
  ): Promise<responseUserDTO>;
  changePassword(
    userId: string,
    hashedPassword: string
  ): Promise<responseUserDTO>;
}
