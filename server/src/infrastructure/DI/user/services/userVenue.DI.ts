import { UserVenueRepository } from "../../../repositories/user/services/repository.userVenue";
import { UserVenueUseCase } from "../../../../application/use-cases/user/services/usecase.userVenue";
import { UserVenueController } from "../../../../Presentation/controllers/user/services/userVenue.controller";

const userVenueRepository = new UserVenueRepository();
const userVenueUseCase = new UserVenueUseCase(userVenueRepository);
const userVenueController = new UserVenueController(userVenueUseCase);
export { userVenueController };
