import { IAssetBase } from "../entities/serviceInterface/interface.asset";

export interface IAssetManagementUseCase {
  execute(typeOfAsset: string): Promise<IAssetBase[]>;
  fetchAssetById(id: string, typeOfAsset: string): Promise<IAssetBase | null>;

}
