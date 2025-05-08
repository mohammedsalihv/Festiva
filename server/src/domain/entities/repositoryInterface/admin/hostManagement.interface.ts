import { IHost } from "../../modelInterface/host.interface";

export interface IHostManagementRepository {
  findAllHosts(): Promise<IHost[]>;
}
