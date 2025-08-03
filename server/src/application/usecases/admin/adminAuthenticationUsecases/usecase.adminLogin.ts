import { IAdminLoginRepository } from "../../../../domain/entities/repositoryInterface/admin/authentication/interface.adminLogin";
import { IAdminLoginUseCase } from "../../../../domain/usecaseInterface/admin/authenticationUsecaseInterfaces/interface.adminLoginUseCase";
import { adminLoginMapper } from "../../../../utils/mapping/admin/adminLoginMapper";
import { IAdminRepository } from "../../../../domain/entities/baseInterface/admin/interface.admin";
import { AdminDetailsDTO } from "../../../../types/DTO/admin/admin.dto";
import CustomError from "../../../../utils/common/errors/CustomError";
import { TokenService } from "../../../tokenService/service.token";
import bcrypt from "bcrypt";
import {
  statusCodes,
  statusMessages,
} from "../../../../utils/common/messages/constantResponses";
import { IAdminLoginValidator } from "../../../../domain/validatorInterface/admin/interface.adminLoginValidator";

export class AdminLoginUsecase implements IAdminLoginUseCase {
  constructor(
    private adminLoginRepository: IAdminLoginRepository,
    private adminRepository: IAdminRepository,
    private tokenService: TokenService,
    private validator: IAdminLoginValidator
  ) {}

  async loginByadmin(
    email: string,
    password: string
  ): Promise<AdminDetailsDTO> {
    const admin = await this.adminLoginRepository.findByEmail(email);
    this.validator.validateAdminExistence(admin);
    this.validator.validateAdminRole(admin);
    this.validator.validateAdminBlocked(admin);
    const validatedAdmin = admin!;

    const adminValidate = await this.adminRepository.findByEmail(email);
    this.validator.validateAdminExistence(adminValidate);
    const validatedAdminData = adminValidate!;

    await this.validator.validatePassword(
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

    const accessToken = this.tokenService.generateAccessToken({
      id: validatedAdmin.id!,
      role: validatedAdmin.role,
    });
    const refreshToken = this.tokenService.generateRefreshToken({
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
