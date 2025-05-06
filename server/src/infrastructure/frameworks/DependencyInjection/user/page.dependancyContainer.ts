import { ProfileController } from "../../../../Presentation/controllers/user/pages/profile.controller";


import { ProfileDataUseCase } from "../../../../application/use-cases/user/Pages/profilePage";

import { UserProfileRepository } from "../../../repositories/user/pages/profileData";



const userProfileRepository = new UserProfileRepository()
const getUserProfile =  new ProfileDataUseCase(userProfileRepository)
const profileDataController = new ProfileController(getUserProfile)

export {
    profileDataController
}