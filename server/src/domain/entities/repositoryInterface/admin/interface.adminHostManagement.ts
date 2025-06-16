import { responseHostDTO } from "../../../../config/DTO/host/dto.host";
import { EditHostPayload } from "../../../adminInterface/interface.editHost";

export interface IAdminHostManagementRepository {
  findAllHosts(): Promise<responseHostDTO[]>;
  HostblockUnblock(hostId: string, isBlocked: boolean): Promise<boolean>;
  editHost(hostId: string, form: EditHostPayload): Promise<responseHostDTO[]>;
  changeProfile(hostId: string, imageFile: string): Promise<responseHostDTO>;
  deleteHost(hostId: string): Promise<boolean>;
}
