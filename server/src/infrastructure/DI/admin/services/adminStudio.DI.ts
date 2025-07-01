import { AdminStudioRepository } from "../../../repositories/admin/services/repository.adminStudio";
import { AdminStudioController } from "../../../../Presentation/controllers/admin/adminServiceControllers/adminStudio.controller";
import { AdminStudioUseCase } from "../../../../application/use-cases/admin/adminServices/usecase.adminStudio";

const adminStudioRepository = new AdminStudioRepository();
const adminStudioUseCase = new AdminStudioUseCase(adminStudioRepository);
const aminStudioController = new AdminStudioController(adminStudioUseCase);

export { aminStudioController };
