import { AdminDetailsDTO } from "../../../types/DTO/admin/admin.dto";

export class adminLoginMapper {
  static toDTO(admin: any): AdminDetailsDTO["admin"] {
    return {
      id: admin.id!,
      firstname: admin.firstname ?? "",
      lastname: admin.lastname ?? "",
      email: admin.email ?? "",
      phone: admin.phone ?? "",
      profilePic: admin.profilePic ?? "",
      role: admin.role ?? "admin",
      isActive: admin.isActive ?? true,
      isBlocked: admin.isBlocked ?? false,
      timestamp: admin.timestamp,
    };
  }
}
