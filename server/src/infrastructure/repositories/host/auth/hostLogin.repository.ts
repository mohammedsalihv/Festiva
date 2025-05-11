import { IHost } from "../../../../domain/entities/modelInterface/host.interface";
import { HostModel } from "../../../../domain/models/hostModel";
import { IHostRepository } from "../../../../domain/entities/repositoryInterface/host/hostLoginRepository.interface";

export class HostLoginRepository implements IHostRepository{
    async findByEmail(email: string): Promise<IHost | null> {
        return HostModel.findOne({email})
    }
}