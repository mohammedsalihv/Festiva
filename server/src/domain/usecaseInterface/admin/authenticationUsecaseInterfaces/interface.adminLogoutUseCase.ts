export interface IAdminLogoutUseCase {
  adminLogout(token: string): Promise<void>;
}
