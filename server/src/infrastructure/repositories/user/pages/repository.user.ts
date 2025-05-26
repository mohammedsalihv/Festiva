import { IUserRepository } from "../../../../domain/entities/repositoryInterface/user/interface.userRepository";
import { resetPasswordDTO } from "../../../../config/DTO/user/dto.user";
import { UserModal } from "../../../../domain/models/userModel";

export class UserRepository implements IUserRepository {
  async findByEmail(email: string) {
    return UserModal.findOne({ email });
  }

  async checkMail(email: string): Promise<Boolean | null> {
    return UserModal.findOne({ email });
  }

  async findById(userId: string) {
    return UserModal.findById(userId);
  }

  async resetPassword(
    email: string,
    form: resetPasswordDTO
  ): Promise<Boolean | null> {
    const result = await UserModal.updateOne(
      { email },
      { $set: { password: form.newPassword } }
    );
    return result.modifiedCount > 0;
  }

  async deleteProfile(userId: string): Promise<boolean> {
    const response = await UserModal.findByIdAndDelete({ _id: userId });
    return response !== null;
  }
}
