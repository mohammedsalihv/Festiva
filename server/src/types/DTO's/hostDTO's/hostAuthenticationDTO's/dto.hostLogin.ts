

export const toHostLoginResponseDTO = (
  host: any,
  accessToken: string,
  refreshToken: string
) => ({
  id: host.id,
  name: host.name,
  email: host.email,
  phone: host.phone,
  profilePic: host.profilePic,
  role: "host",
  accessToken,
  refreshToken,
});

export interface hostLoginDTO {
  email: string;
  password: string;
}
