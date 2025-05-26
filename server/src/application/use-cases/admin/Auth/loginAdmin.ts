import { IAdminLoginRepository } from "../../../../domain/entities/repositoryInterface/admin/interface.adminLogin";
import { IAdminRepository } from "../../../../domain/entities/repositoryInterface/admin/interface.admin";
import { AdminDetailsDTO } from "../../../../config/DTO/admin/dto.admin";
import CustomError from "../../../../utils/CustomError";
import { TokenService } from "../../../../application/services/service.token";
import bcrypt from "bcrypt";

export class LoginAdmin {
  constructor(
    private adminLoginRepository: IAdminLoginRepository,
    private adminRepository: IAdminRepository
  ) {}

  async execute(email: string, password: string): Promise<AdminDetailsDTO> {
    const admin = await this.adminLoginRepository.findByEmail(email);
    if (!admin) {
      throw new CustomError("User not found", 401);
    }

    if (admin.role !== "admin") {
      throw new CustomError("Account unauthorized", 401);
    }

    if (admin.isBlocked) {
      throw new CustomError(
        "This account has been blocked. Please contact support.",
        403
      );
    }

    const adminValidate = await this.adminRepository.findByEmail(email);
    if (!adminValidate) {
      throw new CustomError("User not found", 401);
    }
    const isPasswordValid = adminValidate.password
      ? await bcrypt.compare(password, adminValidate.password)
      : false;

    if (!isPasswordValid) {
      throw new CustomError("Invalid credentials", 401);
    }

    const accessToken = TokenService.generateAccessToken({
      id: admin.id!,
      role: admin.role,
    });
    const refreshToken = TokenService.generateRefreshToken({
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
        role: admin.role || "",
      },
    };
  }
}
