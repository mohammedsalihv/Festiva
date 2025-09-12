import { AdminRentCarRepository } from "../../../repositories/admin/adminServicesRepositories/repository.adminRentCar";
import { AdminRentCarUseCase } from "../../../../application/usecases/admin/adminServicesUsecases/usecase.adminRentCar";
import { AdminRentCarController } from "../../../../adapters/controllers/admin/adminServiceControllers/AdminRentCar.controller";

const adminRentCarRepository = new AdminRentCarRepository();
const adminRentCarUseCase = new AdminRentCarUseCase(adminRentCarRepository);
const adminRentCarController = new AdminRentCarController(adminRentCarUseCase);

export { adminRentCarController };
