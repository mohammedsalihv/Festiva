import { BookingRepository } from "../../../repositories/base/bookingRepositories/repository.booking";
import { BookingController } from "../../../../adapters/controllers/base/bookingControllers/booking.controller";
import { BookingUseCase } from "../../../../application/usecases/base/bookingUsecase/usecase.booking";

const bookingRepository = new BookingRepository();
const bookingUsecase = new BookingUseCase(bookingRepository);
const bookingController = new BookingController(bookingUsecase);

export { bookingController };
