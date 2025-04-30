import { Iuser } from "../../modelInterface/user.interface";
export interface IAdminRepository {
  findByEmail(email: string): Promise<Iuser | null>;
}
