import CustomError from "../../../../utils/common/errors/CustomError";
import { IUserRepository } from "../../../../domain/entities/repositoryInterface/user/interface.userRepository";
import { hash } from "../../../../utils/passwordHash";
import { resetPasswordDTO } from "../../../../config/DTO/user/dto.user";

export class ResetPassword {
  constructor(private userRepository: IUserRepository) {}

  async execute(form: resetPasswordDTO): Promise<Boolean> {
    if (!form) {
      throw new CustomError("New password is required", 400);
    }

    const user = await this.userRepository.findByEmail(form.email);
    if (!user) {
      throw new CustomError("User not found", 404);
    }

    const hashedPassword = await hash(form.newPassword);
    const updated = await this.userRepository.resetPassword(user.email, {
      email: user.email,
      newPassword: hashedPassword,
    });
    return !!updated;
  }
}
