import { UserRentCarUseCase } from "../../../../application/usecases/user/userServiceUsecases/usecase.userRentCar";
import { UserRentCarController } from "../../../../adapters/controllers/user/userServicesControllers/userRentCar.controller";
import { UserRentCarRepository } from "../../../repositories/user/userServicesRepositories/repository.userRentCar";

const userRentCarRepository = new UserRentCarRepository();
const userRentCarUseCase = new UserRentCarUseCase(userRentCarRepository);
const userRentCarController = new UserRentCarController(userRentCarUseCase);

export { userRentCarController };
