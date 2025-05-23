import { IHost } from "../../modelInterface/host.interface";
import { EditHostPayload } from "../../modelInterface/editHost.interface";

export interface IHostManagementRepository {
  findAllHosts(): Promise<IHost[]>;
  HostblockUnblock(hostId: string, isBlocked: boolean): Promise<boolean>;
  editHost(hostId: string, form: EditHostPayload): Promise<IHost[]>;
  changeProfile(hostId: string, imageFile: string): Promise<IHost>;
  deleteHost(hostId: string): Promise<boolean>;
}
