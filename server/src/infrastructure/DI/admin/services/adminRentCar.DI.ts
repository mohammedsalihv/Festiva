import { AdminRentCarRepository } from "../../../repositories/admin/services/repository.adminRentCar";
import { AdminRentCarUseCase } from "../../../../application/use-cases/admin/adminServices/usecase.adminRentCar";
import { AdminRentCarController } from "../../../../Presentation/controllers/admin/adminServiceControllers/AdminRentCar.controller";

const adminRentCarRepository = new AdminRentCarRepository();
const adminRentCarUseCase = new AdminRentCarUseCase(adminRentCarRepository);
const adminRentCarController = new AdminRentCarController(adminRentCarUseCase);

export { adminRentCarController };
