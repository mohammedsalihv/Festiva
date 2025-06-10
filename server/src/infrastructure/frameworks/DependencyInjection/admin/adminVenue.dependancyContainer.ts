import { AdminVenueController } from "../../../../Presentation/controllers/admin/AdminVenue.controller";
import { AdminVenueRepository } from "../../../repositories/admin/repository.adminVenue";
import { AdminVenueUseCase } from "../../../../application/use-cases/admin/adminVenue.usecase";

const adminVenueRepository = new AdminVenueRepository();
const adminVenueUseCase = new AdminVenueUseCase(adminVenueRepository);
const adminVenueController = new AdminVenueController(adminVenueUseCase);

export { adminVenueController };
