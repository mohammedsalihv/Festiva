import { UserBookingsRepository } from "../../../repositories/user/userProfileRepositories/repository.userBookings";
import { UserBookingsUseCase } from "../../../../application/usecases/user/userProfileUsecase/usecase.userBookings";
import { UserBookingsController } from "../../../../adapters/controllers/user/userPagesControllers/userBookings.controller";

const userBookingsRepository = new UserBookingsRepository();
const userBookingsUseCase = new UserBookingsUseCase(userBookingsRepository);
const userBookingsController = new UserBookingsController(userBookingsUseCase);
export { userBookingsController };
