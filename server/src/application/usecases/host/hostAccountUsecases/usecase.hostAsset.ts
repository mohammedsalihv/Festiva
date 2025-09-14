import { IHostAssetUseCase } from "../../../../domain/usecaseInterfaces/hostUsecaseInterfaces/hostAccountUsecaseInterfaces/interface.hostAssetUseCase";
import { IHostAssetRepository } from "../../../../domain/repositoryInterfaces/hostRepositoryInterfaces/hostAccountRepositoryInterfaces/interface.hostAssetRepository";

export class HostAssetUseCase implements IHostAssetUseCase {
  constructor(private _hostAssetRepository: IHostAssetRepository) {}

  async getAllAssets(
    hostId: string,
    page: number,
    limit: number,
    type?: "studio" | "venue" | "rentcar" | "caters",
    search?: string,
    status?: string | string[],
    sortBy?: "newest" | "oldest"
  ) {
    return await this._hostAssetRepository.myAssets(
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
    order: "asc" | "desc" = "desc",
    assetType: string
  ) {
    const validSortFields = ["reqDate", "actionDate", "status"] as const;
    const typedSortBy = validSortFields.includes(sortBy as any)
      ? (sortBy as (typeof validSortFields)[number])
      : undefined;

    return await this._hostAssetRepository.getAllRequests(
      hostId,
      page,
      limit,
      search,
      status,
      typedSortBy,
      order,
      assetType
    );
  }
}
