import { responseUserDTO } from "../../../config/DTO/user/dto.user";
import { IUserManagementRepository } from "../../../domain/entities/repositoryInterface/admin/interface.userManagement";
import CustomError from "../../../utils/CustomError";
import { EditUserPayload } from "../../../domain/adminInterface/interface.editUser";

export class UserManagementUseCase {
  constructor(private userManagementRepository: IUserManagementRepository) {}

  async execute(): Promise<responseUserDTO[]> {
    const users = await this.userManagementRepository.findAll();

    if (!users || users.length === 0) {
      throw new CustomError("Users empty", 401);
    }

    return users;
  }

  async UserBlockUnblock(userId: string, isBlocked: boolean): Promise<boolean> {
    const response = await this.userManagementRepository.UserBlockUnblock(
      userId,
      isBlocked
    );

    if (!response) {
      throw new CustomError("Blocking failed", 500);
    }
    return response;
  }

  async editUser(userId: string, form: EditUserPayload): Promise<responseUserDTO[]> {
    const response = await this.userManagementRepository.editUser(userId, form);

    if (!response || response.length === 0) {
      throw new CustomError("User update failed", 500);
    }

    return response;
  }

  changeProfile(userId: string, image: Express.Multer.File): Promise<responseUserDTO> {
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

    const response = this.userManagementRepository.changeProfile(
      userId,
      imageUrl
    );

    if (!response) {
      throw new CustomError("Profile photo update failed", 401);
    }
    return response;
  }

  async deleteUser(userId: string): Promise<{ message: string }> {
    const result = await this.userManagementRepository.deleteUser(userId);
    if (!result) {
      throw new CustomError("Deleting failed", 500);
    }
    return { message: "User account deleted" };
  }
}
