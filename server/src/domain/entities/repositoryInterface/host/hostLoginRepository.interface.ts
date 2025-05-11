import { IHost } from "../../modelInterface/host.interface";

export interface IHostRepository {
  findByEmail(email: string): Promise<IHost | null>;
}
