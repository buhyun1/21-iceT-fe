import { API_SUB_URLS } from '@/constants/apiConfig';
import axiosInstance from '@/shared/lib/axios';
import { IApiResponse } from '@/shared/types/ApiResponse';

/**
 * DELETE) 탈퇴하기
 */
export const deleteUser = async () => {
  const response = await axiosInstance.delete<IApiResponse<null>>(`${API_SUB_URLS}/users/me`);

  return response.data.data;
};
