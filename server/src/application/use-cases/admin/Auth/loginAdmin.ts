import { IAdminRepository } from "../../../../domain/entities/repositoryInterface/admin/adminLogin.interface";
import CustomError  from "../../../../utils/CustomError";
import { TokenService } from "../../../../application/services/service.token";
import bcrypt from "bcrypt";

export class LoginAdmin {
  constructor(private adminRepository: IAdminRepository) {}

  async execute(
    email: string,
    password: string
  ): Promise<{
    accessToken: string;
    refreshToken: string;
    admin: {
      firstname: string;
      lastname : string;
      phone:string;
      email: string;
      id: string;
      role: string
    };
  }> {

    const admin = await this.adminRepository.findByEmail(email);
    if (!admin) {
      throw new CustomError("User not found", 401);
    }

    if(admin.role !== "admin"){
      throw new CustomError("Account not authrized", 401);
    }

    if (!admin.isBlocked) {
      throw new CustomError("This account has been blocked. Please contact support.", 403);
    }

    const isPasswordValid = admin.password
      ? await bcrypt.compare(password, admin.password)
      : false;

    if (!isPasswordValid) {
      throw new CustomError("Invalid credentials", 401);
    }

    const accessToken = TokenService.generateAccessToken({
      id: admin._id!,
      role: admin.role,
    });
    const refreshToken = TokenService.generateRefreshToken({
      id: admin._id!,
      role: admin.role,
    });

    return {
        accessToken,
        refreshToken,
        admin: {
          id: admin._id!,
          firstname: admin.firstname,
          lastname: admin.lastname ?? "",
          email: admin.email,
          phone:admin.phone || "Please add contact details",
          role: admin.role || "",
        },
      };
  }
}
