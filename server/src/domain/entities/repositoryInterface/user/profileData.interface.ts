import { Iuser } from "../../modelInterface/user.interface";

export interface IUserProfileRepository {
    getUserById(id: string): Promise<Iuser | null>; 
  }
