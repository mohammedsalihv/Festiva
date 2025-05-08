import { UserProfileController } from "../../../../Presentation/controllers/user/pages/UserProfile.controller";
import { UserProfile } from "../../../../application/use-cases/user/Pages/Profile/changeProfile-usecase";

import { UserProfileRepository } from "../../../repositories/user/pages/userProfile.repository";



const userProfileRepository = new UserProfileRepository()
const getUserProfile =  new UserProfile(userProfileRepository)
const userProfileController = new UserProfileController(getUserProfile)

export {
    userProfileController
}