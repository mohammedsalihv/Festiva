import { HostModel } from "../../../../domain/models/hostModel";
import { IHostLoginRepository } from "../../../../domain/entities/repositoryInterface/host/auth repository interface/interface.hostLoginRepository";
import { responseHostDTO } from "../../../../types/DTO/host/dto.host";

export class HostLoginRepository implements IHostLoginRepository{
    async findByEmail(email: string): Promise<responseHostDTO | null> {
        return HostModel.findOne({email})
    }
}