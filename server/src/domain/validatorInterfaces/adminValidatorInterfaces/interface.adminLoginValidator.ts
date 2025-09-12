export interface IAdminLoginValidator {
  validateAdminExistence(admin: any): void;
  validateAdminRole(admin: any): void;
  validateAdminBlocked(admin: any): void;
  validatePassword(
    storedPassword: string,
    inputPassword: string
  ): Promise<void>;
}
