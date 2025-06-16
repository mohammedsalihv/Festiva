import { IUserLoginRepository } from "../../../../domain/entities/repositoryInterface/user/interface.userLoginRepository";
import { responseUserDTO } from "../../../../config/DTO/user/dto.user";
import { UserModal } from "../../../../domain/models/userModel";

export class UserLoginRepository implements IUserLoginRepository {
  async findByEmail(email: string): Promise<responseUserDTO | null> {
    return UserModal.findOne({ email });
  }
}
