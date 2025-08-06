import { IHostAssetUseCase } from "../../../../domain/usecaseInterface/host/accountUsecaseInterfaces/interface.hostAssetUseCase";
import { IHostAssetRepository } from "../../../../domain/entities/repositoryInterface/host/account repository interfaces/interface.hostAssetRepository";

export class HostAssetUseCase implements IHostAssetUseCase {
  constructor(private hostAssetRepository: IHostAssetRepository) {}

  async getAllAssets(
    hostId: string,
    page: number,
    limit: number,
    type?: "studio" | "venue" | "rentcar" | "caters",
    search?: string,
    status?: string | string[],
    sortBy?: "newest" | "oldest"
  ) {
    return await this.hostAssetRepository.myAssets(
      hostId,
      page,
      limit,
      type,
      search,
      status,
      sortBy
    );
  }

  async getAllRequests(
    hostId: string,
    page: number,
    limit: number,
    search = "",
    status = "",
    sortBy = "",
    order: "asc" | "desc" = "desc"
  ) {
    const validSortFields = ["reqDate", "actionDate", "status"] as const;
    const typedSortBy = validSortFields.includes(sortBy as any)
      ? (sortBy as (typeof validSortFields)[number])
      : undefined;

    return await this.hostAssetRepository.getAllRequests(
      hostId,
      page,
      limit,
      search,
      status,
      typedSortBy,
      order
    );
  }
}
