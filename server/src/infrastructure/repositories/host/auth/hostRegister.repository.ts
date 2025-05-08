import { IHost } from "../../../../domain/entities/modelInterface/host.interface";
import { IHostRepository } from "../../../../domain/entities/repositoryInterface/host/hostRepository.interface";
import { HostModel } from "../../../../domain/models/hostModel";

export class HostRepository implements IHostRepository{
    async findByEmail(email: string): Promise<IHost | null> {
        return HostModel.findOne({email})
    }

    async createHost(host: IHost): Promise<IHost> {
        const newHost = new HostModel(host)
        await newHost.save()
        return newHost;
    }
}