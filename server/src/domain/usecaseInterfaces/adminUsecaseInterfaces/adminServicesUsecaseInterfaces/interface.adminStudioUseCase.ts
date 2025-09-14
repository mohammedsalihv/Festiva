import { IStudio } from "../../../baseInterfaces/hostBaseInterfaces/hostServicesInterfaces/interface.studio";

export interface IAdminStudioUseCase {
  studioDetails(studioId: string): Promise<IStudio>;
}
