import { AdminVenueController } from "../../../../adapters/controllers/admin/adminServiceControllers/AdminVenue.controller";
import { AdminVenueRepository } from "../../../repositories/admin/adminServiceRepositories/repository.adminVenue";
import { AdminVenueUseCase } from "../../../../application/usecases/admin/adminServicesUsecases/usecase.adminVenue";

const adminVenueRepository = new AdminVenueRepository();
const adminVenueUseCase = new AdminVenueUseCase(adminVenueRepository);
const adminVenueController = new AdminVenueController(adminVenueUseCase);

export { adminVenueController };
