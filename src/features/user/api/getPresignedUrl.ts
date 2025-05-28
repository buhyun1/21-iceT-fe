import { API_SUB_URLS } from '@/constants/apiConfig';
import axiosInstance from '@/shared/lib/axios';
import { IApiResponse } from '@/shared/types/ApiResponse';

export interface IProfileImageResponse {
  fileUrl: string;
  presignedUrl: string;
}

/**
 * GET) 사용자 프로필 업로드를 위한 presigned url 요청
 * @QueryParam
 * @return fileUrl, presignedUrl
 */
export const getPresignedUrl = async (fileName: string) => {
  const response = await axiosInstance.get<IApiResponse<IProfileImageResponse>>(
    `${API_SUB_URLS}/upload/presigned-url?fileName=${fileName}`
  );

  return response.data.data;
};
