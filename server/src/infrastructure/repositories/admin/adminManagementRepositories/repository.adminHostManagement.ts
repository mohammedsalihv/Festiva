import { IHostModel } from "../../../../domain/entities/modelInterface/host/interface.host";
import { IAdminHostManagementRepository } from "../../../../domain/entities/repositoryInterface/admin/management/interface.adminHostManagementRepository";
import { HostModel } from "../../../../domain/models/host/hostAuthenticationModels/hostModel";
import { pickDefinedFields } from "../../../../utils/validations/user/pickDefinedFields";
import { responseHostDTO } from "../../../../types/DTO/host/dto.host";
import { responseAllHostsDTO } from "../../../../types/DTO/host/dto.host";

export class AdminHostManagementRepostory
  implements IAdminHostManagementRepository
{
  async findAllHosts(
    page: number,
    limit: number
  ): Promise<responseAllHostsDTO> {
    const skip = (page - 1) * limit;

    const [rawHosts, totalItems] = await Promise.all([
      HostModel.find().skip(skip).limit(limit).exec(),
      HostModel.countDocuments().exec(),
    ]);

    const totalPages = Math.ceil(totalItems / limit);

    const data: responseHostDTO[] = rawHosts.map((host) => ({
      id: host._id.toString(),
      name: host.name,
      email: host.email,
      phone: host.phone,
      profilePic: host.profilePic,
      isBlocked: host.isBlocked,
      isActive: host.isActive,
      isVerified: host.isVerified,
      isSubscriber: host.isSubscriber,
      role: host.role,
      location: host.location,
      listedAssets: host.listedAssets,
      totalRequests: host.totalRequests,
      acceptedRequests: host.acceptedRequests,
      rejectedRequests: host.rejectedRequests,
      timestamp: host.timestamp,
    }));

    return {
      data,
      totalItems,
      totalPages,
      currentPage: page,
    };
  }

  async HostblockUnblock(hostId: string, isBlocked: boolean): Promise<boolean> {
    const response = await HostModel.updateOne({ _id: hostId }, { isBlocked });
    return response.modifiedCount > 0;
  }

  async editHost(
    hostId: string,
    form: Partial<IHostModel>
  ): Promise<responseHostDTO[]> {
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
    ] as const satisfies (keyof IHostModel)[];

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

  async changeProfile(
    hostId: string,
    imageUrl: string
  ): Promise<responseHostDTO> {
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

  async getAllHosts(): Promise<IHostModel[]> {
    return await HostModel.find().lean();
  }

  async deleteHost(hostId: string): Promise<boolean> {
    const response = await HostModel.findByIdAndDelete({ _id: hostId });
    return response !== null;
  }
}
