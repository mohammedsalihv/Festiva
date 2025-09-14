import { responseHostDTO } from "../../../../types/DTO's/hostDTO's/hostBaseDTO's/dto.host";
export interface IHostLoginRepository {
  findByEmail(email: string): Promise<responseHostDTO | null>;
}
