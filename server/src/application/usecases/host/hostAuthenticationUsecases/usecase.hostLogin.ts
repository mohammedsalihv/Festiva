import { IHostLoginRepository } from "../../../../domain/entities/repositoryInterface/host/auth repository interface/interface.hostLoginRepository";
import { IHostLoginUseCase } from "../../../../domain/usecaseInterface/host/authenticationUsecaseInterfaces/interface.hostLoginUseCase";
import { IHostRepository } from "../../../../domain/entities/repositoryInterface/host/services repository interface/interface.hostRepository";
import { IHostLoginUsecaseValidator } from "../../../../domain/validatorInterface/host/interface.hostLoginValidator";
import { HostLoginMapper } from "../../../../utils/mapping/host/hostLoginMapper";
import { TokenService } from "../../../tokenService/service.token";
import { HostDetailsDTO } from "../../../../types/DTO/host/dto.host";

export class HostLoginUseCase implements IHostLoginUseCase {
  constructor(
    private hostLoginRepository: IHostLoginRepository,
    private hostRepo: IHostRepository,
    private tokenService: TokenService,
    private validator: IHostLoginUsecaseValidator
  ) {}

  async execute(email: string, password: string): Promise<HostDetailsDTO> {
    this.validator.validateRequiredFields(email, password);

    const host = await this.hostLoginRepository.findByEmail(email);
    this.validator.validateHostExistence(host);

    const fullHost = await this.hostRepo.findByEmail(email);
    this.validator.validateAccountExistence(fullHost);
    await this.validator.validatePassword(fullHost.password, password);

    const accessToken = this.tokenService.generateAccessToken({
      id: host?.id!,
      role: host?.role,
    });

    const refreshToken = this.tokenService.generateRefreshToken({
      id: host?.id!,
      role: host?.role,
    });

    return {
      accessToken,
      refreshToken,
      host: HostLoginMapper.toDTO(host),
    };
  }
}
