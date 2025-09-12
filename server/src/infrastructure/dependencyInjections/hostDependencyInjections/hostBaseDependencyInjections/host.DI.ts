import { HostController } from "../../../../adapters/controllers/host/hostBaseControllers/host.controller";
import { HostRepository } from "../../../repositories/host/hostBaseRepositories/repository.host";
import { HostUseCase } from "../../../../application/usecases/host/hostBaseUsecases/usecase.host";

const hostRepository = new HostRepository();
const hostUseCase = new HostUseCase(hostRepository);
const hostController = new HostController(hostUseCase);

export { hostController };
