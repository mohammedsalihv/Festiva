// src/infrastructure/repositories/UserRepository.ts
import { IAdminRepository } from "../../../../domain/entities/repositoryInterface/admin/adminLogin.repository";
import { Iuser } from "../../../../domain/entities/modelInterface/user.interface";
import { UserModal } from "../../../../domain/models/userModel";

export class adminLoginRepository implements IAdminRepository {
  async findByEmail(email: string): Promise<Iuser | null> {
    return UserModal.findOne({ email });
  }
}