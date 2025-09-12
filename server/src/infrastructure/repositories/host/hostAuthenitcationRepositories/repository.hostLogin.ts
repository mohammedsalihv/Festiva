import { HostModel } from "../../../../domain/models/host/hostAuthenticationModels/hostModel";
import { IHostLoginRepository } from "../../../../domain/entities/repositoryInterface/host/auth repository interface/interface.hostLoginRepository";
import { responseHostDTO } from "../../../../types/DTO's/hostDTO's/hostBaseDTO's/dto.host";

export class HostLoginRepository implements IHostLoginRepository{
    async findByEmail(email: string): Promise<responseHostDTO | null> {
        return HostModel.findOne({email})
    }
}