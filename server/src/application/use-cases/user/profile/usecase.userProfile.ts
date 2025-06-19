import { responseUserDTO } from "../../../../types/DTO/user/dto.user";
import { IUserProfileRepository } from "../../../../domain/entities/repositoryInterface/user/interface.userProfileRepository";
import { IUserRepository } from "../../../../domain/entities/repositoryInterface/user/interface.userRepository";
import CustomError from "../../../../utils/common/errors/CustomError";
import {
  changePasswordDTO,
  profileEditDTO,
} from "../../../../types/DTO/user/dto.user";
import { hash } from "../../../../utils/common/auth/passwordHash";
import {
  statusCodes,
  statusMessages,
} from "../../../../utils/common/messages/constantResponses";
import bcrypt from "bcrypt";

export class UserProfileUseCase {
  constructor(
    private userProfileRepository: IUserProfileRepository,
    private userRepository: IUserRepository
  ) {}

  async execute(userId: string, image: string): Promise<responseUserDTO> {
    const response = await this.userProfileRepository.setProfilePic(
      userId,
      image
    );

    if (!response) {
      throw new CustomError(
        "Profile photo update failed",
        statusCodes.serverError
      );
    }
    return response;
  }

  
  async profileEdit(
    userId: string,
    form: profileEditDTO
  ): Promise<responseUserDTO> {
    if (form.email) {
      const existedEmail = await this.userRepository.findByEmail(form.email);
      if (
        existedEmail?._id?.toString() !== userId.toString() &&
        existedEmail?._id !== undefined
      ) {
        throw new CustomError(
          statusMessages.accountExisted,
          statusCodes.forbidden
        );
      }
    }

    const response = await this.userProfileRepository.profileEdit(userId, form);

    if (!response) {
      throw new CustomError("User update failed", statusCodes.serverError);
    }

    return response;
  }

  async validateEmail(email: string): Promise<Boolean> {
    const existedEmail = await this.userRepository.checkMail(email);
    if (!existedEmail) {
      throw new CustomError(
        statusMessages.accountExisted,
        statusCodes.forbidden
      );
    }
    return existedEmail;
  }

  async passwordModify(
    userId: string,
    form: changePasswordDTO
  ): Promise<responseUserDTO> {
    if (!userId) {
      throw new CustomError(
        statusMessages.uniqueIDMissing,
        statusCodes.forbidden
      );
    }

    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new CustomError(
        statusMessages.accountNotfound,
        statusCodes.notfound
      );
    }

    const isPasswordValid = user.password
      ? await bcrypt.compare(form.currentPassword, user.password)
      : false;

    if (!isPasswordValid) {
      throw new CustomError(
        statusMessages.invalidCredential,
        statusCodes.forbidden
      );
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
      throw new CustomError("Deleting failed", statusCodes.serverError);
    }
    return response;
  }
}
