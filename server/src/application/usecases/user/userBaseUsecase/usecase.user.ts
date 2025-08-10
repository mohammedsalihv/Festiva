import { IUserUseCase } from "../../../../domain/usecaseInterface/user/userBaseUsecaseInterfaces/interface.userUseCase";
import { IUserRepository } from "../../../../domain/entities/repositoryInterface/user/account/interface.userRepository";
import { resetPasswordDTO } from "../../../../types/DTO/user/dto.user";

export class UserUseCase implements IUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async checkMail(email: string): Promise<boolean | null> {
    return this.userRepository.checkMail(email);
  }

  async resetPassword(
    email: string,
    form: resetPasswordDTO
  ): Promise<boolean | null> {
    return this.userRepository.resetPassword(email, form);
  }

  async findByEmail(email: string) {
    return this.userRepository.findByEmail(email);
  }

  async findById(userId: string) {
    return this.userRepository.findById(userId);
  }

  async deleteProfile(userId: string): Promise<boolean> {
    return this.userRepository.deleteProfile(userId);
  }
}
