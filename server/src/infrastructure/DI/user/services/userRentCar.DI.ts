import { UserRentCarUseCase } from "../../../../application/use-cases/user/services/usecase.userRentCar";
import { UserRentCarController } from "../../../../Presentation/controllers/user/userServicesControllers/userRentCar.controller";
import { UserRentCarRepository } from "../../../repositories/user/services/repository.userRentCar";

const userRentCarRepository = new UserRentCarRepository();
const userRentCarUseCase = new UserRentCarUseCase(userRentCarRepository);
const userRentCarController = new UserRentCarController(userRentCarUseCase);

export { userRentCarController };
