import { IHost } from "../../../domain/entities/modelInterface/host.interface";
import { IHostManagementRepository } from "../../../domain/entities/repositoryInterface/admin/hostManagement.interface";
import { HostModel } from "../../../domain/models/hostModel";

export class HostManagementRepostory implements IHostManagementRepository {
  findAllHosts(): Promise<IHost[]> {
    return HostModel.find().exec();
  }
}
