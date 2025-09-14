import { responseUserDTO } from "../../../../types/DTO's/userDTO's/userBaseDTO's/dto.user";
import { userProfileEditDTO, changePasswordDTO } from "../../../../types/DTO's/userDTO's/userBaseDTO's/dto.user";

export interface IUserProfileUseCase {
  execute(userId: string, image: string): Promise<responseUserDTO>;
  profileEdit(userId: string, form: userProfileEditDTO): Promise<responseUserDTO>;
  validateEmail(email: string): Promise<Boolean>; 
  passwordModify(userId: string, form: changePasswordDTO): Promise<responseUserDTO>;
  deleteProfile(userId: string): Promise<Boolean>;
}
