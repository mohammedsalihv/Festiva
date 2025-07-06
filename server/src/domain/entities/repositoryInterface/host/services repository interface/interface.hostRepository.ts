import { IHost } from "../../../modelInterface/interface.host";

export interface IHostRepository {
  findByEmail(email: string): Promise<IHost | null>;
}
