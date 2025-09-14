import { IHostGoogleLoginRepository } from "../../../../domain/repositoryInterfaces/hostRepositoryInterfaces/hostAuthenticationRepositoryInterfaces/interface.hostGoogleLoginRepository";
import { HostModel } from "../../../../domain/entities/databaseModels/hostModels/hostAuthenticationModels/hostModel";
import { IHostModel } from "../../../../domain/entities/databaseModelInterfaces/hostModelInterfaces/interface.host";
import { responseHostDTO } from "../../../../types/DTO's/hostDTO's/hostBaseDTO's/dto.host";

export class HostGoogleLoginRepository implements IHostGoogleLoginRepository {
  async findByEmail(email: string): Promise<responseHostDTO | null> {
    return HostModel.findOne({ email });
  }

  async createHost(host: IHostModel): Promise<responseHostDTO> {
    const newHost = new HostModel(host);
    await newHost.save();
    return newHost;
  }
}
