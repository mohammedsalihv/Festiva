import { UserStudioRepository } from "../../../repositories/user/services/repository.userStudio";
import { UserStudioUseCase } from "../../../../application/use-cases/user/services/usecase.userStudio";
import { UserStudioController } from "../../../../Presentation/controllers/user/userServicesControllers/userStudio.controller";

const userStudioRepository = new UserStudioRepository();
const userStudioUseCase = new UserStudioUseCase(userStudioRepository);
const userStudioController = new UserStudioController(userStudioUseCase);

export { userStudioController };
