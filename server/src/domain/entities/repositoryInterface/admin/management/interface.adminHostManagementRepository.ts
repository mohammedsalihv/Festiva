import { EditHostPayload } from "../../../../adminInterface/interface.editHost";
import { responseHostDTO } from "../../../../../types/DTO/host/dto.host";
import { responseAllHostsDTO } from "../../../../../types/DTO/host/dto.host";
import { IHostModel } from "../../../modelInterface/host/interface.host";

export interface IAdminHostManagementRepository {
  findAllHosts(page: number, limit: number): Promise<responseAllHostsDTO>;
  HostblockUnblock(hostId: string, isBlocked: boolean): Promise<boolean>;
  editHost(hostId: string, form: EditHostPayload): Promise<responseHostDTO[]>;
  changeProfile(hostId: string, imageFile: string): Promise<responseHostDTO>;
  getAllHosts():Promise<IHostModel[]>
  deleteHost(hostId: string): Promise<boolean>;
}
