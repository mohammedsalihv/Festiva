import { IHostStudioRepository } from "../../../../domain/entities/repositoryInterface/host/interface.hostStudioRepository";
import ErrorHandler from "../../../../utils/common/errors/CustomError";
import { IStudio } from "../../../../domain/entities/serviceInterface/interface.studio";
import { statusCodes } from "../../../../utils/common/messages/constantResponses";
import { IHostStudioUseCase } from "../../../../domain/usecaseInterface/host/interface.studioUseCase";

export class HostStudioUseCase implements IHostStudioUseCase {
  constructor(private hostStudioRepository: IHostStudioRepository) {}

  async addStudio(studio: IStudio): Promise<IStudio> {
    const addedStudio = await this.hostStudioRepository.addStudio(studio);

    if (!addedStudio) {
      throw new ErrorHandler("Studio not added", statusCodes.serverError);
    }
    return studio;
  }
}
