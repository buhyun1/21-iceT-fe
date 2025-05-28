import { API_SUB_URLS } from '@/constants/apiConfig';
import { IApiResponse } from '@/shared/types/ApiResponse';
import axios from 'axios';

const refreshAxios = axios.create({
  baseURL: axios.defaults.baseURL,
  withCredentials: true,
});

/**
 * POST) 토큰 리프레쉬
 */
export const refreshAccessToken = async () => {
  const response = await refreshAxios.post<IApiResponse<null>>(`${API_SUB_URLS}/auth/refresh`);

  return response.data.data;
};
