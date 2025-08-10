import { responseUserDTO } from "../../../../types/DTO/user/dto.user";
import { profileEditDTO, changePasswordDTO } from "../../../../types/DTO/user/dto.user";

export interface IUserProfileUseCase {
  execute(userId: string, image: string): Promise<responseUserDTO>;
  profileEdit(userId: string, form: profileEditDTO): Promise<responseUserDTO>;
  validateEmail(email: string): Promise<Boolean>; 
  passwordModify(userId: string, form: changePasswordDTO): Promise<responseUserDTO>;
  deleteProfile(userId: string): Promise<Boolean>;
}
