import { EditHostPayload } from "../../../../adminInterface/interface.editHost";
import { responseHostDTO } from "../../../../../types/DTO/host/dto.host";

export interface IAdminHostManagementRepository {
  findAllHosts(): Promise<responseHostDTO[]>;
  HostblockUnblock(hostId: string, isBlocked: boolean): Promise<boolean>;
  editHost(hostId: string, form: EditHostPayload): Promise<responseHostDTO[]>;
  changeProfile(hostId: string, imageFile: string): Promise<responseHostDTO>;
  deleteHost(hostId: string): Promise<boolean>;
}
