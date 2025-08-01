import { IHostRepository } from "../../../../domain/entities/repositoryInterface/host/services repository interface/interface.hostRepository";
import { HostModel } from "../../../../domain/models/hostModel";
import { IHost } from "../../../../domain/entities/modelInterface/host/interface.host";

export class HostRepository implements IHostRepository {
  async findByEmail(email: string): Promise<IHost | null> {
    return HostModel.findOne({ email });
  }
}
