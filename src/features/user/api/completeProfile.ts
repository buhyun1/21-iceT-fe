import { API_SUB_URLS } from '@/constants/apiConfig';
import axiosInstance from '@/shared/lib/axios';
import { IApiResponse } from '@/shared/types/ApiResponse';

export interface ICompleteProfileRequest {
  nickname: string;
  profileImgUrl: string;
  statusMsg: string;
}

/**
 * POST) 사용자 추가 정보 등록
 * @request_body nickname, profileImg, statusMsg
 */
export const completeProfile = async (profileData: ICompleteProfileRequest) => {
  const response = await axiosInstance.post<IApiResponse<null>>(
    `${API_SUB_URLS}/users/me`,
    profileData
  );

  return response.data.data;
};
