import { HostModel } from "../../../../domain/entities/databaseModels/hostModels/hostAuthenticationModels/hostModel";
import { IHostLoginRepository } from "../../../../domain/repositoryInterfaces/hostRepositoryInterfaces/hostAuthenticationRepositoryInterfaces/interface.hostLoginRepository";
import { responseHostDTO } from "../../../../types/DTO's/hostDTO's/hostBaseDTO's/dto.host";

export class HostLoginRepository implements IHostLoginRepository{
    async findByEmail(email: string): Promise<responseHostDTO | null> {
        return HostModel.findOne({email})
    }
}