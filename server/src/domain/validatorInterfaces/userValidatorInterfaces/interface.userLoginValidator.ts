
export interface IUserLoginValidator {
  validateUserExistence(user: any): void;
  validateUserBlocked(user: any): void;
  validatePassword(storedPassword: string, inputPassword: string): Promise<void>;
}
