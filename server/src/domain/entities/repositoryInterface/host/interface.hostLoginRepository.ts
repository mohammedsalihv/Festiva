import { responseHostDTO } from "../../../../config/DTO/host/dto.host";

export interface IHostLoginRepository {
  findByEmail(email: string): Promise<responseHostDTO | null>;
}
