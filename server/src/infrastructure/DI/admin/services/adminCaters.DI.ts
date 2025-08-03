import { AdminCatersController } from "../../../../Presentation/controllers/admin/adminServiceControllers/adminCaters.controller";
import { AdminCatersUseCase } from "../../../../application/usecases/admin/adminServicesUsecases/usecase.adminCaters";
import { AdminCatersRepository } from "../../../repositories/admin/adminServiceRepositories/repository.adminCaters";

const adminCatersRepository = new AdminCatersRepository();
const adminCatersUseCase = new AdminCatersUseCase(adminCatersRepository);
const adminCatersController = new AdminCatersController(adminCatersUseCase);

export { adminCatersController };
