
import { IHostGoogleSignupRepository } from "../../../../domain/entities/repositoryInterface/host/auth repository interface/interface.hostGoogleSignupRepository";
import { HostModel } from "../../../../domain/models/hostModel";
import { IHost } from "../../../../domain/entities/modelInterface/interface.host";
import { responseHostDTO } from "../../../../types/DTO/host/dto.host";

export class HostGoogleSignupRepository implements IHostGoogleSignupRepository {
  async findByEmail(email: string): Promise<responseHostDTO | null> {
    return HostModel.findOne({ email });
  }

  async createHost(host: IHost): Promise<responseHostDTO> {
    const newHost = new HostModel(host);
    await newHost.save();
    return newHost;
  }
}
