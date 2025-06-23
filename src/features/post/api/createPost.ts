import { API_SUB_URLS_V3 } from '@/constants/apiConfig';
import axiosInstance from '@/shared/lib/axios';
import { IApiResponse } from '@/shared/types/ApiResponse';

export interface ICreatePostRequest {
  problemNumber: number;
  title: string;
  content: string;
  category?: string[];
}

/**
 * POST) 게시글 등록하기
 * @body
 */
export const createPost = async (data: ICreatePostRequest) => {
  console.log(data);
  const response = await axiosInstance.post<IApiResponse<{ postId: number }>>(
    `${API_SUB_URLS_V3}/posts`,
    data
  );

  return response.data.data;
};
