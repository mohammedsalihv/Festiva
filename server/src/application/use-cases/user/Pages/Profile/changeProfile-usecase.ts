import { IUser } from "../../../../../domain/entities/modelInterface/user.interface";
import { IUserProfileRepository } from "../../../../../domain/entities/repositoryInterface/user/userProfile.interface";
import CustomError from "../../../../../utils/errorHandler";

export class UserProfile {
  constructor(private UserProfileRepository: IUserProfileRepository) {}

  async execute(userId: string, image: Express.Multer.File): Promise<IUser> {

    if (!image) {
      throw new CustomError("No image file provided", 400);
    }

    const imagePath = image.path;

    const response = await this.UserProfileRepository.changeProfile(userId, imagePath);

    if (!response) {
      throw new CustomError("Profile photo update failed", 401);
    }

    return response;
  }
}
