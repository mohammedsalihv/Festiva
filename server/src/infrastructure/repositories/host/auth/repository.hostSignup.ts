import { IHost } from "../../../../domain/entities/modelInterface/host/interface.host";
import { IHostSignupRepository } from "../../../../domain/entities/repositoryInterface/host/auth repository interface/interface.hostSignupRepository";
import { HostModel } from "../../../../domain/models/hostModel";
import { responseHostDTO } from "../../../../types/DTO/host/dto.host";

export class HostSignupRepository implements IHostSignupRepository {
  async findByEmail(email: string): Promise<responseHostDTO | null> {
    return HostModel.findOne({ email });
  }

  async createHost(host: IHost): Promise<responseHostDTO> {
    const newHost = new HostModel(host);
    await newHost.save();
    return newHost;
  }
}
