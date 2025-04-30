import { Iuser } from "../../modelInterface/user.interface";
export interface IUserRepository {
  findByEmail(email: string): Promise<Iuser | null>;
}
