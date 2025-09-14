import { IHostRepository } from "../../../../domain/repositoryInterfaces/hostRepositoryInterfaces/hostBaseRepositoryInterfaces/interface.hostRepository";
import { IHostModel } from "../../../../domain/entities/databaseModelInterfaces/hostModelInterfaces/interface.host";
import { HostModel } from "../../../../domain/entities/databaseModels/hostModels/hostAuthenticationModels/hostModel";

export class HostRepository implements IHostRepository {
  async findByEmail(email: string): Promise<IHostModel | null> {
    return HostModel.findOne({ email });
  }
  async findById(hostId: string): Promise<IHostModel | null> {
    return HostModel.findById(hostId);
  }
}
