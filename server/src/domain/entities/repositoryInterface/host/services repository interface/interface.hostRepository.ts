import { IHost } from "../../../modelInterface/host/interface.host";

export interface IHostRepository {
  findByEmail(email: string): Promise<IHost | null>;
}
