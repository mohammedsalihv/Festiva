import { IHost } from "../../../../domain/entities/modelInterface/interface.host";
import { IHostRegisterRepository } from "../../../../domain/entities/repositoryInterface/host/interface.hostRegisterRepository";
import { HostModel } from "../../../../domain/models/hostModel";
import { responseHostDTO } from "../../../../config/DTO/host/dto.host";

export class HostRegisterRepository implements IHostRegisterRepository{
    async findByEmail(email: string): Promise<responseHostDTO | null> {
        return HostModel.findOne({email})
    }

    async createHost(host: IHost): Promise<responseHostDTO> {
        const newHost = new HostModel(host)
        await newHost.save()
        return newHost;
    }
}