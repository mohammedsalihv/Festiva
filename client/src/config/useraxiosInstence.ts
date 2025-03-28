import axios , { AxiosInstance} from 'axios';
import store from '@/redux/store';
import { setUserDetails , logoutUser } from '@/redux/userSlice';


const axiosInstance:AxiosInstance = axios.create({
    baseURL:import.meta.env.VITE_BASE_URL as string,
    withCredentials:true,
    timeout:10000,
})

axiosInstance.interceptors.request.use(
    (config) =>{
        const state = store.getState();
        const token = state.user.userInfo?.accessToken
        if(token) config.headers.Authorization = `Bearer${token}`;
        return config;
    },
    (error) => Promise.reject(error)
)

axiosInstance.interceptors.response.use(
    (response) => response,
    async(error) =>{
        const originalRequest = error.config;
        if(error.response?.status === 401 && !originalRequest._retry){
            originalRequest._retry = true;
            try {
                const state = store.getState();
                const refreshToken = state.user.userInfo?.refreshToken

                if(!refreshToken){
                    store.dispatch(logoutUser())
                    return Promise.reject(error)
                }

                const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/auth/refresh` ,{
                    refreshToken
                });

                const {accessToken , refreshToken : newRefreshToken , user} = response.data
                store.dispatch(setUserDetails({...user , accessToken , refreshToken : newRefreshToken}));
                originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                store.dispatch(logoutUser());
                return Promise.reject(refreshError)
            }        
    }
    return Promise.reject(error)
 } 
)

export default axiosInstance