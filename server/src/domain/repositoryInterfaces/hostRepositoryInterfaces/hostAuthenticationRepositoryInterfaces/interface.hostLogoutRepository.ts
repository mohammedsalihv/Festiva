export interface IHostLogoutRepository {
  blacklistToken(token: string): Promise<void>;
  isTokenBlacklisted(token: string): Promise<boolean>;
}
