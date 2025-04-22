
import { RootState } from '@/redux/store';

export const selectUserInfo = (state: RootState) => state.user.userInfo;
export const selectIsAuthenticated = (state: RootState) => !!state.user.userInfo?.accessToken;
export const selectUserRole = (state: RootState) => state.user.userInfo?.role;
