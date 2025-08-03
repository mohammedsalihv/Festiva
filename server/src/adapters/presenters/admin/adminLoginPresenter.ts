export class adminLoginPresenter {
  static format(admin: any, accessToken: string, refreshToken: string) {
    return {
      id: admin.id,
      firstname: admin.firstname,
      lastname: admin.lastname,
      phone: admin.phone,
      email: admin.email,
      role: admin.role,
      profilePic: admin.profilePic,
      isBlocked: admin.isBlocked,
      isActive: admin.isActive,
      timestamp: admin.timestamp,
      accessToken,
      refreshToken,
    };
  }
}
