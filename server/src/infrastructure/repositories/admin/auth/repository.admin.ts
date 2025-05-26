import { IAdminRepository } from "../../../../domain/entities/repositoryInterface/admin/interface.admin";
import { IUser } from "../../../../domain/entities/modelInterface/interface.user";
import { UserModal } from "../../../../domain/models/userModel";

export class AdminRepository implements IAdminRepository {
  async findByEmail(email: string): Promise<IUser | null> {
    return UserModal.findOne({ email });
  }
}