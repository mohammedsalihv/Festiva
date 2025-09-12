import { HostDetailsDTO } from "../../../../types/DTO's/hostDTO's/hostBaseDTO's/dto.host";

export interface IHostLoginUseCase {
  execute(email: string, password: string): Promise<HostDetailsDTO>;
}
