import { IStudio } from "../../../serviceInterface/interface.studio";

export interface IAdminStudioRepository {
  studioDetails(studioId: string): Promise<IStudio | null>;
}
