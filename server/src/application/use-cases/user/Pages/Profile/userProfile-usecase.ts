import { responseUserDTO } from "../../../../../config/DTO/user/dto.user";
import { IUserProfileRepository } from "../../../../../domain/entities/repositoryInterface/user/interface.userProfile";
import CustomError from "../../../../../utils/CustomError";
import {
  changePasswordDTO,
  profileEditDTO,
} from "../../../../../config/DTO/user/dto.user";
import { IUserRepository } from "../../../../../domain/entities/repositoryInterface/user/interface.userRepository";
import bcrypt from "bcrypt";
import { hash } from "../../../../../utils/passwordHash";

export class UserProfile {
  constructor(
    private userProfileRepository: IUserProfileRepository,
    private userRepository: IUserRepository
  ) {}

  async execute(
    userId: string,
    image: Express.Multer.File
  ): Promise<responseUserDTO> {
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

    const imageName = image.filename;
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

  async profileEdit(
    userId: string,
    form: profileEditDTO
  ): Promise<responseUserDTO> {
    if (!userId) {
      throw new CustomError("User ID is required", 400);
    }

    if (!form) {
      throw new CustomError("Edited data is required", 400);
    }

    if (form.email) {
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

  async validateEmail(email: string): Promise<Boolean> {
    const existedEmail = await this.userRepository.checkMail(email);
    if (!existedEmail) {
      throw new CustomError("Email already registered, try another one", 400);
    }
    return existedEmail;
  }

  async passwordModify(
    userId: string,
    form: changePasswordDTO
  ): Promise<responseUserDTO> {
    if (!userId) {
      throw new CustomError("User ID is required", 400);
    }

    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new CustomError("User not found", 404);
    }

    const isPasswordValid = user.password
      ? await bcrypt.compare(form.currentPassword, user.password)
      : false;

    if (!isPasswordValid) {
      throw new CustomError("Invalid current password", 403);
    }

    const hashedPassword = await hash(form.newPassword);
    const updatedUser = await this.userProfileRepository.changePassword(
      userId,
      hashedPassword
    );
    return updatedUser;
  }

  async deleteProfile(userId: string): Promise<Boolean> {
    const response = await this.userRepository.deleteProfile(userId);
    if (!response) {
      throw new CustomError("Deleting failed", 500);
    }
    return response;
  }
}
