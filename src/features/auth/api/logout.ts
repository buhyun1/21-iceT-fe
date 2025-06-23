import { API_SUB_URLS } from '@/constants/apiConfig';
import axiosInstance from '@/shared/lib/axios';
import { IApiResponse } from '@/shared/types/ApiResponse';

/**
 *  POST) 로그아웃
 */
export const logout = async () => {
  const response = await axiosInstance.post<IApiResponse<{ redirectUrl: string }>>(
    `${API_SUB_URLS}/auth/logout`
  );

  return response.data.data;
};
