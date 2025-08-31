import { IUserRepository } from "../../../../domain/entities/repositoryInterface/user/account/interface.userRepository";
import { resetPasswordDTO } from "../../../../types/DTO/user/dto.user";
import { UserModel } from "../../../../domain/models/user/userAuthenticationModels/userModel";
import { IUserModel } from "../../../../domain/entities/modelInterface/user/interface.user";

export class UserRepository implements IUserRepository {
  async findByEmail(email: string) {
    return UserModel.findOne({ email });
  }

  async checkMail(email: string): Promise<boolean | null> {
    return UserModel.findOne({ email });
  }

  async findById(userId: string) {
    return UserModel.findById(userId);
  }

  async resetPassword(
    email: string,
    form: resetPasswordDTO
  ): Promise<boolean | null> {
    const result = await UserModel.updateOne(
      { email },
      { $set: { password: form.newPassword } }
    );
    return result.modifiedCount > 0;
  }

  async deleteProfile(userId: string): Promise<boolean> {
    const response = await UserModel.findByIdAndDelete({ _id: userId });
    return response !== null;
  }

  findByIdsForReviews(userIds: string[]): Promise<IUserModel[] | null> {
      return UserModel.find({ _id:{$in:userIds}})
  }
}
