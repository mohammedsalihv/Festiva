import { Iuser } from "../../modelInterface/user.interface";;

export interface IUserRepository {
  findByEmail(email: string): Promise<Iuser | null>;
  createUser(user: Iuser): Promise<Iuser>;
  updateUser(id: string, updates: Partial<Iuser>): Promise<Iuser | null>;
  // getUsersByPremiumStatus(isPremiumUser: boolean): Promise<Iuser[]>;
  // updateUserPremiumStatus(userId: string, isPremiumUser: boolean): Promise<Iuser | null>;
}
    