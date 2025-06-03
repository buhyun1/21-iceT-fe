import { API_SUB_URLS } from '@/constants/apiConfig';
import axiosInstance from '@/shared/lib/axios';
import { IApiResponse } from '@/shared/types/ApiResponse';

export interface IGetUserProfileResponse {
  userId: number;
  nickname: string;
  statusMsg: string;
  profileImgUrl: string;
}

/**
 * GET) 사용자 정보 조회
 * @returns userId, nickname, statusMessage, profileImgUrl
 */
export const getUserProfile = async () => {
  const response = await axiosInstance.get<IApiResponse<IGetUserProfileResponse>>(
    `${API_SUB_URLS}/users/me`
  );

  return response.data.data;
};
