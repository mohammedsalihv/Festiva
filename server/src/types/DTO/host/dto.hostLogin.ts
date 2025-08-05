import { getSignedImageUrl } from "../../../utils/common/cloudinary/getSignedImageUrl";

export const toHostLoginResponseDTO = (
  host: any,
  accessToken: string,
  refreshToken: string
) => ({
  id: host.id,
  name: host.name,
  email: host.email,
  phone: host.phone,
  profilePic: host.profilePic
    ? getSignedImageUrl(host.profilePic, undefined, 300)
    : undefined,
  role: "host",
  accessToken,
  refreshToken,
});

export interface hostLoginDTO {
  email: string;
  password: string;
}
