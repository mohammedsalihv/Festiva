import { resetPasswordDTO } from "../../../../types/DTO's/userDTO's/userBaseDTO's/dto.user";

export interface IUserPasswordResetUseCase {
  execute(form: resetPasswordDTO): Promise<boolean>;
}
