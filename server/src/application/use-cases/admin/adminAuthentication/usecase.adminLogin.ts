import { IAdminLoginRepository } from "../../../../domain/entities/repositoryInterface/admin/interface.adminLogin";
import { IAdminRepository } from "../../../../domain/entities/repositoryInterface/admin/interface.admin";
import { AdminDetailsDTO } from "../../../../types/DTO/admin/admin.dto";
import CustomError from "../../../../utils/common/errors/CustomError";
import { TokenService } from "../../../tokenService/service.token";
import bcrypt from "bcrypt";
import {
  statusCodes,
  statusMessages,
} from "../../../../utils/common/messages/constantResponses";

export class AdminLoginUsecase {
  constructor(
    private adminLoginRepository: IAdminLoginRepository,
    private adminRepository: IAdminRepository,
    private tokenService: TokenService
  ) {}

  async execute(email: string, password: string): Promise<AdminDetailsDTO> {
    const admin = await this.adminLoginRepository.findByEmail(email);
    if (!admin) {
      throw new CustomError(
        statusMessages.accountNotfound,
        statusCodes.notfound
      );
    }

    if (admin.role !== "admin") {
      throw new CustomError(
        statusMessages.accountUnauthorized,
        statusCodes.unAuthorized
      );
    }

    if (admin.isBlocked) {
      throw new CustomError(
        statusMessages.accountBlocked,
        statusCodes.forbidden
      );
    }

    const adminValidate = await this.adminRepository.findByEmail(email);
    if (!adminValidate) {
      throw new CustomError(
        statusMessages.accountNotfound,
        statusCodes.notfound
      );
    }
    const isPasswordValid = adminValidate.password
      ? await bcrypt.compare(password, adminValidate.password)
      : false;

    if (!isPasswordValid) {
      throw new CustomError(
        statusMessages.invalidCredential,
        statusCodes.unAuthorized
      );
    }

    const accessToken = this.tokenService.generateAccessToken({
      id: admin.id!,
      role: admin.role,
    });
    const refreshToken = this.tokenService.generateRefreshToken({
      id: admin.id!,
      role: admin.role,
    });

    return {
      accessToken,
      refreshToken,
      admin: {
        id: admin.id!,
        firstname: admin.firstname ?? "",
        lastname: admin.lastname ?? "",
        email: admin.email ?? "",
        phone: admin.phone || "",
        profilePic: admin.profilePic || "",
        role: admin.role || "admin",
        isActive: admin.isActive || true,
        isBlocked: admin.isBlocked || false,
        timestamp: admin.timestamp,
      },
    };
  }
}
