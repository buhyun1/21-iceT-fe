import { API_SUB_URLS_V3 } from '@/constants/apiConfig';
import axiosInstance from '@/shared/lib/axios';
import { IApiResponse } from '@/shared/types/ApiResponse';

/**
 * POST) 게시글 등록하기
 * @body
 */
export const createPost = async () => {
  const response = await axiosInstance.post<IApiResponse<{ postId: number }>>(
    `${API_SUB_URLS_V3}/posts`
  );

  return response.data.data;
};
