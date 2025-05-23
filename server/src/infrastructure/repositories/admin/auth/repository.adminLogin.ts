// src/infrastructure/repositories/UserRepository.ts
import { IAdminRepository } from "../../../../domain/entities/repositoryInterface/admin/adminLogin.interface";
import { IUser } from "../../../../domain/entities/modelInterface/user.interface";
import { UserModal } from "../../../../domain/models/userModel";

export class adminLoginRepository implements IAdminRepository {
  async findByEmail(email: string): Promise<IUser | null> {
    return UserModal.findOne({ email });
  }
}