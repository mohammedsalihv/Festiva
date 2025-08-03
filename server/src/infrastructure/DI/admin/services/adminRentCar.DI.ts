import { AdminRentCarRepository } from "../../../repositories/admin/adminServiceRepositories/repository.adminRentCar";
import { AdminRentCarUseCase } from "../../../../application/usecases/admin/adminServicesUsecases/usecase.adminRentCar";
import { AdminRentCarController } from "../../../../Presentation/controllers/admin/adminServiceControllers/adminRentCar.controller";

const adminRentCarRepository = new AdminRentCarRepository();
const adminRentCarUseCase = new AdminRentCarUseCase(adminRentCarRepository);
const adminRentCarController = new AdminRentCarController(adminRentCarUseCase);

export { adminRentCarController };
