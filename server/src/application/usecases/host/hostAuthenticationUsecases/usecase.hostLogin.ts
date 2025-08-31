import { IHostLoginRepository } from "../../../../domain/entities/repositoryInterface/host/auth repository interface/interface.hostLoginRepository";
import { IHostLoginUseCase } from "../../../../domain/usecaseInterface/host/authenticationUsecaseInterfaces/interface.hostLoginUseCase";
import { IHostRepository } from "../../../../domain/entities/repositoryInterface/host/services repository interface/interface.hostRepository";
import { IHostLoginUsecaseValidator } from "../../../../domain/validatorInterface/host/interface.hostLoginValidator";
import { HostLoginMapper } from "../../../../utils/mapping/host/hostLoginMapper";
import { ITokenService } from "../../../../domain/entities/baseInterface/authenticationInterfaces/interface.tokenService";
import { HostDetailsDTO } from "../../../../types/DTO/host/dto.host";

export class HostLoginUseCase implements IHostLoginUseCase {
  constructor(
    private _hostLoginRepository: IHostLoginRepository,
    private _hostRepository: IHostRepository,
    private _tokenService: ITokenService,
    private _validator: IHostLoginUsecaseValidator
  ) {}

  async execute(email: string, password: string): Promise<HostDetailsDTO> {
    this._validator.validateRequiredFields(email, password);

    const host = await this._hostLoginRepository.findByEmail(email);
    this._validator.validateHostExistence(host);

    const fullHost = await this._hostRepository.findByEmail(email);
    this._validator.validateAccountExistence(fullHost);
    await this._validator.validatePassword(fullHost!.password, password);

    const accessToken = this._tokenService.generateAccessToken({
      id: host?.id!,
      role: host?.role,
    });

    const refreshToken = this._tokenService.generateRefreshToken({
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
