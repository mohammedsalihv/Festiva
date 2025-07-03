import { UserCatersController } from "../../../../Presentation/controllers/user/userServicesControllers/userCaters.controller";
import { UserCatersRepository } from "../../../repositories/user/services/repository.userCaters";
import { UserCatersUseCase } from "../../../../application/use-cases/user/services/usecase.userCaters";

const userCatersRepository = new UserCatersRepository();
const userCatersUseCase = new UserCatersUseCase(userCatersRepository);
const userCatersController = new UserCatersController(userCatersUseCase);

export { userCatersController };
