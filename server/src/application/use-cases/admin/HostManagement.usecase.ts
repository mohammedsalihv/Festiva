import { IHost } from "../../../domain/entities/modelInterface/host.interface";
import { IHostManagementRepository } from "../../../domain/entities/repositoryInterface/admin/hostManagement.interface";
import CustomError from "../../../utils/CustomError";
import { EditHostPayload } from "../../../domain/entities/modelInterface/editHost.interface";

export class HostManagementUseCase {
  constructor(private HostManagementRepository: IHostManagementRepository) {}

  async execute(): Promise<IHost[]> {
    const hosts = await this.HostManagementRepository.findAllHosts();
    if (!hosts || hosts.length === 0) {
      throw new CustomError("Users empty", 401);
    }

    return hosts;
  }

  async HostBlockUnblock(hostId: string, isBlocked: boolean): Promise<boolean> {
    const response = await this.HostManagementRepository.HostblockUnblock(
      hostId,
      isBlocked
    );
    if (!response) {
      throw new CustomError("Blocking failed", 500);
    }
    return response;
  }

  async editHost(hostId: string, form: EditHostPayload): Promise<IHost[]> {
    const response = await this.HostManagementRepository.editHost(hostId, form);

    if (!response || response.length === 0) {
      throw new CustomError("Host update failed", 500);
    }

    return response;
  }

  async changeProfile(
    hostId: string,
    image: Express.Multer.File
  ): Promise<IHost> {
    if (!image) {
      throw new CustomError("No image file provided", 400);
    }

    if (!hostId) {
      throw new CustomError("Host ID required", 400);
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
    const response = await this.HostManagementRepository.changeProfile(
      hostId,
      imageUrl
    );

    if (!response) {
      throw new CustomError("Profile photo update failed", 401);
    }
    return response;
  }

  async deleteHost(hostId: string): Promise<{ message: string }> {
    const result = await this.HostManagementRepository.deleteHost(hostId);
    if (!result) {
      throw new CustomError("Deleting failed", 500);
    }
    return { message: "Host account deleted" };
  }
}
