import { UserProfileController } from "../../../../adapters/controllers/user/userPagesControllers/userProfile.controller";
import { UserProfileUseCase } from "../../../../application/usecases/user/userProfileUsecase/usecase.userProfile";
import { UserProfileRepository } from "../../../repositories/user/userProfileRepositories/repository.userProfile";
import { UserRepository } from "../../../repositories/user/userBaseRepositories/repository.user";

const userProfileRepository = new UserProfileRepository();
const userRepository = new UserRepository();

const userProfileUseCase = new UserProfileUseCase(
  userProfileRepository,
  userRepository
);
const userProfileController = new UserProfileController(userProfileUseCase);

export { userProfileController };
