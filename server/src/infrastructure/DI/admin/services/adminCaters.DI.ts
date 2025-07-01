import { AdminCatersController } from "../../../../Presentation/controllers/admin/adminServiceControllers/adminCaters.controller";
import { AdminCatersUseCase } from "../../../../application/use-cases/admin/adminServices/usecase.adminCaters";
import { AdminCatersRepository } from "../../../repositories/admin/services/repository.adminCaters";

const adminCatersRepository = new AdminCatersRepository();
const adminCatersUseCase = new AdminCatersUseCase(adminCatersRepository);
const adminCatersController = new AdminCatersController(adminCatersUseCase);

export { adminCatersController };
