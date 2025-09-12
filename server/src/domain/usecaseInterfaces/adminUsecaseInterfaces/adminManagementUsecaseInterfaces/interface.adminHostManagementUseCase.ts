import { EditHostPayload } from "../../../baseInterfaces/adminBaseInterfaces/interface.editHost";
import {
  responseAllHostsDTO,
  responseHostDTO,
} from "../../../../types/DTO's/hostDTO's/hostBaseDTO's/dto.host";

export interface IAdminHostManagementUseCase {
  findAllHosts(page: number, limit: number): Promise<responseAllHostsDTO>;
  HostblockUnblock(hostId: string, isBlocked: boolean): Promise<boolean>;
  editHost(hostId: string, form: EditHostPayload): Promise<responseHostDTO[]>;
  changeProfile(hostId: string, imageUrl: string): Promise<responseHostDTO>;
  deleteHost(hostId: string): Promise<boolean>;
}
