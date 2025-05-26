import { HostModel } from "../../../../domain/models/hostModel";
import { IHostLoginRepository } from "../../../../domain/entities/repositoryInterface/host/interface.hostLoginRepository";
import { responseHostDTO } from "../../../../config/DTO/host/dto.host";

export class HostLoginRepository implements IHostLoginRepository{
    async findByEmail(email: string): Promise<responseHostDTO | null> {
        return HostModel.findOne({email})
    }
}