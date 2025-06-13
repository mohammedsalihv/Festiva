import { IHost } from "../../../domain/entities/modelInterface/interface.host";
import { IHostManagementRepository } from "../../../domain/entities/repositoryInterface/admin/interface.hostManagement";
import { HostModel } from "../../../domain/models/hostModel";
import { pickDefinedFields } from "../../../utils/common/general/pickDefinedFields";
import { responseHostDTO } from "../../../config/DTO/host/dto.host";

export class HostManagementRepostory implements IHostManagementRepository {
  async findAllHosts(): Promise<responseHostDTO[]> {
    return HostModel.find().exec();
  }
  async HostblockUnblock(hostId: string, isBlocked: boolean): Promise<boolean> {
    const response = await HostModel.updateOne({ _id: hostId }, { isBlocked });
    return response.modifiedCount > 0;
  }

  async editHost(hostId: string, form: Partial<IHost>): Promise<responseHostDTO[]> {
    const allowedFields = [
      "name",
      "phone",
      "role",
      "isActive",
      "isBlocked",
      "location",
      "isVerified",
      "isSubscriber",
      "listedAssets",
      "totalRequests",
      "acceptedRequests",
      "rejectedRequests",
    ] as const satisfies (keyof IHost)[];

    const updateData = pickDefinedFields(form, allowedFields);

    const response = await HostModel.updateOne(
      { _id: hostId },
      { $set: updateData }
    );
    if (response.modifiedCount === 0) {
      throw new Error("Host update failed");
    }

    return HostModel.find().exec();
  }

  async changeProfile(hostId: string, imageUrl: string): Promise<responseHostDTO> {
    const updateHost = await HostModel.findByIdAndUpdate(
      hostId,
      { profilePic: imageUrl },
      { new: true }
    );

    if (!updateHost) {
      throw new Error("Update failed");
    }
    return updateHost;
  }

  async deleteHost(hostId: string): Promise<boolean> {
    const response = await HostModel.findByIdAndDelete({ _id: hostId });
    return response !== null;
  }
}
