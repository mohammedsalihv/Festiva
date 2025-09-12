export interface IHostLogoutUseCase {
  logout(token: string): Promise<void>;
}
