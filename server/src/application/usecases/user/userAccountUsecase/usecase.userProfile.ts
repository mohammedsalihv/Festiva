import { responseUserDTO } from "../../../../types/DTO's/userDTO's/userBaseDTO's/dto.user";
import { IUserProfileUseCase } from "../../../../domain/usecaseInterfaces/userUsecaseInterfaces/userProfileUsecaseInterfaces/interface.userProfileUseCase";
import { IUserProfileRepository } from "../../../../domain/repositoryInterfaces/userRepositoryInterfaces/userAccountRepositoryInterfaces/interface.userProfileRepository";
import { IUserRepository } from "../../../../domain/repositoryInterfaces/userRepositoryInterfaces/userAccountRepositoryInterfaces/interface.userRepository";
import CustomError from "../../../../utils/baseUtilities/errors/CustomError";
import {
  changePasswordDTO,
  userProfileEditDTO,
} from "../../../../types/DTO's/userDTO's/userBaseDTO's/dto.user";
import { hash } from "../../../../utils/baseUtilities/authentications/passwordHash";
import {
  statusCodes,
  statusMessages,
} from "../../../../utils/baseUtilities/messages/constantResponses";
import bcrypt from "bcrypt";

export class UserProfileUseCase implements IUserProfileUseCase {
  constructor(
    private _userProfileRepository: IUserProfileRepository,
    private _userRepository: IUserRepository
  ) {}

  async execute(userId: string, image: string): Promise<responseUserDTO> {
    const response = await this._userProfileRepository.setProfilePic(
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
    form:   userProfileEditDTO,
  ): Promise<responseUserDTO> {
    if (form.email) {
      const existedEmail = await this._userRepository.findByEmail(form.email);
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

    const response = await this._userProfileRepository.profileEdit(
      userId,
      form
    );

    if (!response) {
      throw new CustomError("User update failed", statusCodes.serverError);
    }

    return response;
  }

  async validateEmail(email: string): Promise<Boolean> {
    const existedEmail = await this._userRepository.checkMail(email);
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

    const user = await this._userRepository.findById(userId);

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
    const updatedUser = await this._userProfileRepository.changePassword(
      userId,
      hashedPassword
    );
    return updatedUser;
  }

  async deleteProfile(userId: string): Promise<Boolean> {
    const response = await this._userRepository.deleteProfile(userId);
    if (!response) {
      throw new CustomError("Deleting failed", statusCodes.serverError);
    }
    return response;
  }
}
