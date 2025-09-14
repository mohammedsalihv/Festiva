import { IHostLoginRepository } from "../../../../domain/repositoryInterfaces/hostRepositoryInterfaces/hostAuthenticationRepositoryInterfaces/interface.hostLoginRepository";
import { IHostLoginUseCase } from "../../../../domain/usecaseInterfaces/hostUsecaseInterfaces/hostAuthenticationUsecaseInterfaces/interface.hostLoginUseCase";
import { IHostRepository } from "../../../../domain/repositoryInterfaces/hostRepositoryInterfaces/hostBaseRepositoryInterfaces/interface.hostRepository";
import { IHostLoginUsecaseValidator } from "../../../../domain/validatorInterfaces/hostValidatorInterfaces/interface.hostLoginValidator";
import { HostLoginMapper } from "../../../../utils/mapping/hostMappings/hostLoginMapper";
import { ITokenService } from "../../../../domain/baseInterfaces/baseAuthenticationInterfaces/interface.tokenService";
import { HostDetailsDTO } from "../../../../types/DTO's/hostDTO's/hostBaseDTO's/dto.host";

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
