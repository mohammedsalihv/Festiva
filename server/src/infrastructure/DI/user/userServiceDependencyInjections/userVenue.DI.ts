import { UserVenueRepository } from "../../../repositories/user/userPagesRepositories/repository.userVenue";
import { UserVenueUseCase } from "../../../../application/usecases/user/usetServiceUsecases/usecase.userVenue";
import { UserVenueController } from "../../../../adapters/controllers/user/userServicesControllers/userVenue.controller";

const userVenueRepository = new UserVenueRepository();
const userVenueUseCase = new UserVenueUseCase(userVenueRepository);
const userVenueController = new UserVenueController(userVenueUseCase);
export { userVenueController };
