import { IAssetBase } from "../../entities/serviceInterface/interface.asset";

export interface IAdminAssetManagementUseCase {
  execute(typeOfAsset: string): Promise<IAssetBase[]>;
  fetchAssetById(id: string, typeOfAsset: string): Promise<IAssetBase | null>;
  assetApprove(id:string , typeOfAsset:string ,assetStatus : string) : Promise<boolean>
  assetReject(id:string , typeOfAsset:string , assetStatus : string) : Promise<boolean>
}
