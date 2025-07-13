export interface IUserLogoutUseCase {
  logout(token: string): Promise<void>;
}
