import { resetPasswordDTO } from "../../../../types/DTO/user/dto.user";

export interface IUserPasswordResetUseCase {
  execute(form: resetPasswordDTO): Promise<boolean>;
}
