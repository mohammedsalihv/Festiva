import { UserStudioRepository } from "../../../repositories/user/userServicesRepositories/repository.userStudio";
import { UserStudioUseCase } from "../../../../application/usecases/user/userServiceUsecases/usecase.userStudio";
import { UserStudioController } from "../../../../adapters/controllers/user/userServicesControllers/userStudio.controller";

const userStudioRepository = new UserStudioRepository();
const userStudioUseCase = new UserStudioUseCase(userStudioRepository);
const userStudioController = new UserStudioController(userStudioUseCase);

export { userStudioController };
