import { IUserLoginRepository } from "../../../../domain/entities/repositoryInterface/user/interface.loginRepository";
import { responseUserDTO } from "../../../../config/DTO/user/dto.user";
import { UserModal } from "../../../../domain/models/userModel";

export class LoginRepository implements IUserLoginRepository {
  async findByEmail(email: string): Promise<responseUserDTO | null> {
    return UserModal.findOne({ email });
  }
}
