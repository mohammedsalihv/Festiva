import { Ihost } from "../../../../domain/entities/modelInterface/host.interface";
import { HostModel } from "../../../../domain/models/hostModel";
import { IhostRepository } from "../../../../domain/entities/repositoryInterface/host/hostLoginRepository.interface";

export class HostLoginRepository implements IhostRepository{
    async findByEmail(email: string): Promise<Ihost | null> {
        return HostModel.findOne({email})
    }
}