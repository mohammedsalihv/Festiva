import { UserCatersController } from "../../../../adapters/controllers/user/userServicesControllers/userCaters.controller";
import { UserCatersRepository } from "../../../repositories/user/userServicesRepositories/repository.userCaters";
import { UserCatersUseCase } from "../../../../application/usecases/user/userServiceUsecases/usecase.userCaters";

const userCatersRepository = new UserCatersRepository();
const userCatersUseCase = new UserCatersUseCase(userCatersRepository);
const userCatersController = new UserCatersController(userCatersUseCase);

export { userCatersController };
