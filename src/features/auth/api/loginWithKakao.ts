import { API_SUB_URLS } from '@/constants/apiConfig';
import axiosInstance from '@/shared/lib/axios';
import { IApiResponse } from '@/shared/types/ApiResponse';

/**
 * POST) 카카오 로그인
 * @param code
 */
export const loginWithKakao = async (code: string) => {
  const response = await axiosInstance.get<
    IApiResponse<{ email: string; name: string; isRegistered: boolean }>
  >(`${API_SUB_URLS}/auth/callback?code=${code}`);

  return response.data.data;
};
