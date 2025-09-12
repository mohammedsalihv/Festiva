import { IAdminLoginRepository } from "../../../../domain/entities/repositoryInterface/admin/authentication/interface.adminLogin";
import { IAdminLoginUseCase } from "../../../../domain/usecaseInterface/admin/authenticationUsecaseInterfaces/interface.adminLoginUseCase";
import { adminLoginMapper } from "../../../../utils/mapping/adminMappings/adminLoginMapper";
import { IAdminRepository } from "../../../../domain/entities/baseInterface/admin/interface.admin";
import { AdminDetailsDTO } from "../../../../types/DTO's/adminDTO's/adminBaseDTO's/dto.admin";
import CustomError from "../../../../utils/baseUtilities/errors/CustomError";
import { ITokenService } from "../../../../domain/entities/baseInterface/authenticationInterfaces/interface.tokenService";
import bcrypt from "bcrypt";
import {
  statusCodes,
  statusMessages,
} from "../../../../utils/baseUtilities/messages/constantResponses";
import { IAdminLoginValidator } from "../../../../domain/validatorInterface/admin/interface.adminLoginValidator";

export class AdminLoginUsecase implements IAdminLoginUseCase {
  constructor(
    private _adminLoginRepository: IAdminLoginRepository,
    private _adminRepository: IAdminRepository,
    private _tokenService: ITokenService,
    private _validator: IAdminLoginValidator
  ) {}

  async loginByadmin(
    email: string,
    password: string
  ): Promise<AdminDetailsDTO> {
    const admin = await this._adminLoginRepository.findByEmail(email);
    this._validator.validateAdminExistence(admin);
    this._validator.validateAdminRole(admin);
    this._validator.validateAdminBlocked(admin);
    const validatedAdmin = admin!;

    const adminValidate = await this._adminRepository.findByEmail(email);
    this._validator.validateAdminExistence(adminValidate);
    const validatedAdminData = adminValidate!;

    await this._validator.validatePassword(
      validatedAdminData.password!,
      password
    );

    const isPasswordValid = validatedAdminData.password
      ? await bcrypt.compare(password, validatedAdminData.password)
      : false;

    if (!isPasswordValid) {
      throw new CustomError(
        statusMessages.invalidCredential,
        statusCodes.unAuthorized
      );
    }

    const accessToken = this._tokenService.generateAccessToken({
      id: validatedAdmin.id!,
      role: validatedAdmin.role,
    });
    const refreshToken = this._tokenService.generateRefreshToken({
      id: validatedAdmin.id!,
      role: validatedAdmin.role,
    });

    return {
      accessToken,
      refreshToken,
      admin: adminLoginMapper.toDTO(validatedAdmin),
    };
  }
}
