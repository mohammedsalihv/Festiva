export interface ITokenService {
  generateAccessToken(payload: { id: string; role?: string }): string;
  generateRefreshToken(payload: { id: string; role?: string }): string;
  verifyRefreshToken(token: string): { id: string; role?: string } | null;
}
