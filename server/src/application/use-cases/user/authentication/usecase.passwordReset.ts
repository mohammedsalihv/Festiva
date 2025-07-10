import CustomError from "../../../../utils/common/errors/CustomError";
import { IUserRepository } from "../../../../domain/entities/repositoryInterface/user/account/interface.userRepository";
import { hash } from "../../../../utils/common/auth/passwordHash";
import { resetPasswordDTO } from "../../../../types/DTO/user/dto.user";
import {
  statusCodes,
  statusMessages,
} from "../../../../utils/common/messages/constantResponses";

export class UserPasswordResetUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(form: resetPasswordDTO): Promise<Boolean> {
    if (!form) {
      throw new CustomError("New password is required", statusCodes.forbidden);
    }

    const user = await this.userRepository.findByEmail(form.email);
    if (!user) {
      throw new CustomError(
        statusMessages.accountNotfound,
        statusCodes.notfound
      );
    }

    const hashedPassword = await hash(form.newPassword);
    const updated = await this.userRepository.resetPassword(user.email, {
      email: user.email,
      newPassword: hashedPassword,
    });
    return !!updated;
  }
}
