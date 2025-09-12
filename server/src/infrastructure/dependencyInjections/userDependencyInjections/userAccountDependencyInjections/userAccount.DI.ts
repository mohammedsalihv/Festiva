import { UserProfileController } from "../../../../adapters/controllers/user/userAccountControllers/userProfile.controller";
import { UserProfileUseCase } from "../../../../application/usecases/user/userAccountUsecase/usecase.userProfile";
import { UserProfileRepository } from "../../../repositories/user/userAccountRepositories/repository.userProfile";
import { UserUseCase } from "../../../../application/usecases/user/userBaseUsecase/usecase.user";
import { UserRepository } from "../../../repositories/user/userBaseRepositories/repository.user";

const userProfileRepository = new UserProfileRepository();
const userRepository = new UserRepository();
const userUseCase = new UserUseCase(userRepository);

const userProfileUseCase = new UserProfileUseCase(
  userProfileRepository,
  userRepository
);
const userProfileController = new UserProfileController(userProfileUseCase);

export { userProfileController };
