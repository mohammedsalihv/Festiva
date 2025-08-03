import { IHostGoogleLoginRepository } from "../../../../domain/entities/repositoryInterface/host/auth repository interface/interface.hostGoogleLoginRepository";
import { HostModel } from "../../../../domain/models/host/hostAuthenticationModels/hostModel";
import { IHostModel } from "../../../../domain/entities/modelInterface/host/interface.host";
import { responseHostDTO } from "../../../../types/DTO/host/dto.host";

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
