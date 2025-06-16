import { UserProfileController } from "../../../Presentation/controllers/user/pages/UserProfile.controller";
import { UserProfileUseCase } from "../../../application/use-cases/user/profile/usecase.userProfile";
import { UserProfileRepository } from "../../repositories/user/pages/repository.userProfile";
import { UserRepository } from "../../repositories/user/pages/repository.user";

const userProfileRepository = new UserProfileRepository();
const userRepository = new UserRepository();

const userProfileUseCase = new UserProfileUseCase(userProfileRepository, userRepository);
const userProfileController = new UserProfileController(userProfileUseCase);

export { userProfileController };
