import axiosInstance from "@/config/user/userAxiosInstence";
import { AxiosError } from "axios";


export interface SignupData {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface GoogleLoginData {
  name: string;
  email: string;
  sub: string;
}

// interface ProfileResponse {
//   success: boolean;
//   message: string;
//   user: {
//     id: string;
    
//   };
//   accessToken?: string; // Optional, so it can be string | undefined
//   refreshToken?: string; // Optional, so it can be string | undefined
// }


export const registerUser = async (data: SignupData) => {
  const response = await axiosInstance.post("/auth/signup", data);
  return response.data;
};

export const LoginUser = async (data: LoginData) => {
  try {
    const response = await axiosInstance.post("/auth/login", data);
    return response.data;
  } catch (error: unknown) {
    if(error instanceof AxiosError){
    console.error("Login failed:", error.response?.data || error.message);
    throw error;
    }
  }
};

export const sendOtp = async ({ email }: { email: string }) => {
  const response = await axiosInstance.post("/auth/send-otp", { email });
  return response.data;
};


export const googleLogin = async (data: GoogleLoginData) => {
  const response = await axiosInstance.post("/auth/google-login", data);
  return response.data;
};



export const verifyOtp = async ({
  email,
  otp,
}: {
  email: string;
  otp: string;
}) => {
  const response = await axiosInstance.post("/auth/verify_otp", { email, otp });
  return response.data;
};


// export const profileData = async (): Promise<ProfileResponse> => {
//   try {
//     // Make the request to auth/profile
//     const response = await axiosInstance.get<ProfileResponse>("auth/profile");

//     // Update Redux store with new user details and tokens (if provided)
//     const { user, accessToken, refreshToken } = response.data;
//     if (user || accessToken || refreshToken) {
//       store.dispatch(
//         setUserDetails({
//           ...user,
//           accessToken,
//           refreshToken,
//         })
//       );
//     }

//     return response.data;
//   } catch (error: any) {
//     // Handle specific error cases based on backend response
//     if (error.response) {
//       const { status, data } = error.response;
//       if (status === 401) {
//         // The interceptor should handle 401 errors and refresh the token
//         // If we reach here, refresh likely failed, and logoutUser was dispatched
//         throw new Error("Session expired. Please log in again.");
//       } else if (status === 404) {
//         throw new Error("User not found.");
//       } else if (status === 403) {
//         throw new Error("User is blocked. Please contact support.");
//       } else {
//         throw new Error(data.message || "Failed to fetch profile data.");
//       }
//     }
//     throw new Error(error.message || "Network error. Please try again.");
//   }
// };