import { UserProfileController } from "../../../../Presentation/controllers/user/pages/UserProfile.controller";
import { UserProfile } from "../../../../application/use-cases/user/Pages/Profile/userProfile-usecase";
import { UserProfileRepository } from "../../../repositories/user/pages/repository.userProfile";
import { UserRepository } from "../../../repositories/user/pages/repository.user";

const userProfileRepository = new UserProfileRepository();
const userRepository = new UserRepository();

const getUserProfile = new UserProfile(userProfileRepository, userRepository);
const userProfileController = new UserProfileController(getUserProfile);

export { userProfileController };
