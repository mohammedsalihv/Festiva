import { HostDetailsDTO } from "../../../../types/DTO/host/dto.host";

export interface IHostLoginUseCase {
  execute(email: string, password: string): Promise<HostDetailsDTO>;
}
