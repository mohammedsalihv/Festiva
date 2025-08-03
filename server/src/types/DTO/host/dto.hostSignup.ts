
export const toHostSignupResponseDTO = (host: any, accessToken: string, refreshToken: string) => ({
  host: {
    id: host.id,
    name: host.name,
    phone: host.phone,
    email: host.email,
    location: host.location,
    role: host.role,
  },
  accessToken,
  refreshToken,
});
