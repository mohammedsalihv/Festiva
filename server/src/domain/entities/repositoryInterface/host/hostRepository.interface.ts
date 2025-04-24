import { Ihost } from "../../modelInterface/host.interface";

export interface IHostRepository {
  findByEmail(email: string): Promise<Ihost | null>;
  createHost(host: Ihost): Promise<Ihost>;
}
