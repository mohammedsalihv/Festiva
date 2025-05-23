import { IUser } from "../../../../../domain/entities/modelInterface/user.interface";
import { IUserProfileRepository } from "../../../../../domain/entities/repositoryInterface/user/interface.userProfile";
import CustomError from "../../../../../utils/CustomError";
import { profileEditDTO } from "../../../../../config/DTO/userDtos";
import { IUserRepository } from "../../../../../domain/entities/repositoryInterface/user/interface.userRepository";

export class UserProfile {
  constructor(
    private userProfileRepository: IUserProfileRepository,
    private userRepository: IUserRepository
  ) {}

  async execute(userId: string, image: Express.Multer.File): Promise<IUser> {
    if (!image) {
      throw new CustomError("No image file provided", 400);
    }

    const allowedMimeTypes = ["image/jpeg", "image/png", "image/gif"];
    if (!allowedMimeTypes.includes(image.mimetype)) {
      throw new CustomError(
        "Invalid file type. Only JPEG, PNG, and GIF are allowed.",
        400
      );
    }

    const imageName = image.filename; // confirm this property is correct for your multer setup
    const imageUrl = `uploads/singleImages/${imageName}`;

    const response = await this.userProfileRepository.setProfilePic(
      userId,
      imageUrl
    );

    if (!response) {
      throw new CustomError("Profile photo update failed", 500);
    }

    return response;
  }

  async profileEdit(userId: string, form: profileEditDTO): Promise<IUser> {
    if (!userId) {
      throw new CustomError("User ID is required", 400);
    }

    if (!form) {
      throw new CustomError("Edited data is required", 400);
    }

    if (form.email) {
      // Optionally: validate email format here

      const existedEmail = await this.userRepository.findByEmail(form.email);
      if (
        existedEmail?._id?.toString() !== userId.toString() &&
        existedEmail?._id !== undefined
      ) {
        throw new CustomError("Email already registered, try another one", 400);
      }
    }

    const response = await this.userProfileRepository.profileEdit(userId, form);

    if (!response) {
      throw new CustomError("User update failed", 500);
    }

    return response;
  }
}
