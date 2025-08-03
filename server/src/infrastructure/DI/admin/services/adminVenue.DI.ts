import { AdminVenueController } from "../../../../Presentation/controllers/admin/adminServiceControllers/adminVenue.controller";
import { AdminVenueRepository } from "../../../repositories/admin/adminServiceRepositories/repository.adminVenue";
import { AdminVenueUseCase } from "../../../../application/usecases/admin/adminServicesUsecases/usecase.adminVenue";

const adminVenueRepository = new AdminVenueRepository();
const adminVenueUseCase = new AdminVenueUseCase(adminVenueRepository);
const adminVenueController = new AdminVenueController(adminVenueUseCase);

export { adminVenueController };
