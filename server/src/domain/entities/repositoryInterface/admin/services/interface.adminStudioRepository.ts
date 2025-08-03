import { IStudio } from "../../../serviceInterface/host/interface.studio";

export interface IAdminStudioRepository {
  studioDetails(studioId: string): Promise<IStudio | null>;
}
