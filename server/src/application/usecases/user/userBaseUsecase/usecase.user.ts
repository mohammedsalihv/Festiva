import { IUserUseCase } from "../../../../domain/usecaseInterface/user/userBaseUsecaseInterfaces/interface.userUseCase";
import { IUserRepository } from "../../../../domain/entities/repositoryInterface/user/account/interface.userRepository";
import { resetPasswordDTO } from "../../../../types/DTO's/userDTO's/userBaseDTO's/dto.user";

export class UserUseCase implements IUserUseCase {
  constructor(private _userRepository: IUserRepository) {}

  async checkMail(email: string): Promise<boolean | null> {
    return this._userRepository.checkMail(email);
  }

  async resetPassword(
    email: string,
    form: resetPasswordDTO
  ): Promise<boolean | null> {
    return this._userRepository.resetPassword(email, form);
  }

  async findByEmail(email: string) {
    return this._userRepository.findByEmail(email);
  }

  async findById(userId: string) {
    return this._userRepository.findById(userId);
  }

  async deleteProfile(userId: string): Promise<boolean> {
    return this._userRepository.deleteProfile(userId);
  }
}
