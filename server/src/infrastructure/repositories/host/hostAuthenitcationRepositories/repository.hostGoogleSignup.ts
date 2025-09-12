import { IHostGoogleSignupRepository } from "../../../../domain/entities/repositoryInterface/host/auth repository interface/interface.hostGoogleSignupRepository";
import { HostModel } from "../../../../domain/models/host/hostAuthenticationModels/hostModel";
import { IHostModel } from "../../../../domain/entities/databaseModelInterfaces/hostModelInterfaces/interface.host";
import { responseHostDTO } from "../../../../types/DTO's/hostDTO's/hostBaseDTO's/dto.host";

export class HostGoogleSignupRepository implements IHostGoogleSignupRepository {
  async findByEmail(email: string): Promise<responseHostDTO | null> {
    return HostModel.findOne({ email });
  }

  async createHost(host: IHostModel): Promise<responseHostDTO> {
    const newHost = new HostModel(host);
    await newHost.save();
    return newHost;
  }
}
