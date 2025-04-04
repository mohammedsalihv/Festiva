// src/infrastructure/repositories/UserRepository.ts
import { IUserRepository } from "../../../../domain/entities/repositoryInterface/user/loginRepository.interface";
import { Iuser } from "../../../../domain/entities/modelInterface/user.interface";
import { UserModal } from "../../../../domain/models/userModel";

export class LoginRepository implements IUserRepository {
  async findByEmail(email: string): Promise<Iuser | null> {
    return UserModal.findOne({ email });
  }
}