import { responseHostDTO } from "../../../../../types/DTO/host/dto.host";

export interface IHostLoginRepository {
  findByEmail(email: string): Promise<responseHostDTO | null>;
}
