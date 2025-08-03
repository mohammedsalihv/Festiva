import { AdminStudioRepository } from "../../../repositories/admin/adminServiceRepositories/repository.adminStudio";
import { AdminStudioController } from "../../../../Presentation/controllers/admin/adminServiceControllers/adminStudio.controller";
import { AdminStudioUseCase } from "../../../../application/usecases/admin/adminServicesUsecases/usecase.adminStudio";

const adminStudioRepository = new AdminStudioRepository();
const adminStudioUseCase = new AdminStudioUseCase(adminStudioRepository);
const adminStudioController = new AdminStudioController(adminStudioUseCase);

export { adminStudioController };
