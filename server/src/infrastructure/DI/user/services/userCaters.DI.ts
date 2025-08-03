import { UserCatersController } from "../../../../adapters/controllers/user/userServicesControllers/userCaters.controller";
import { UserCatersRepository } from "../../../repositories/user/userPagesRepositories/repository.userCaters";
import { UserCatersUseCase } from "../../../../application/usecases/user/usetServiceUsecases/usecase.userCaters";

const userCatersRepository = new UserCatersRepository();
const userCatersUseCase = new UserCatersUseCase(userCatersRepository);
const userCatersController = new UserCatersController(userCatersUseCase);

export { userCatersController };
