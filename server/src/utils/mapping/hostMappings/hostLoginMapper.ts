import { HostDetailsDTO } from "../../../types/DTO's/hostDTO's/hostBaseDTO's/dto.host";

export class HostLoginMapper {
  static toDTO(host: any): HostDetailsDTO["host"] {
    return {
      id: host.id!,
      name: host.name ?? "",
      email: host.email ?? "",
      phone: host.phone ?? "",
      role: host.role ?? "host",
      location: host.location ?? "",
      profilePic: host.profilePic ?? "",
    };
  }
}
