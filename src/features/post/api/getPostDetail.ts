import { API_SUB_URLS_V3 } from '@/constants/apiConfig';
import axiosInstance from '@/shared/lib/axios';
import { IApiResponse } from '@/shared/types/ApiResponse';
import { Author } from '../types/author';
import { Category } from '../types/Category';

export interface IGetPostDetailResponse {
  problemNumber: number;
  postId: number;
  title: string;
  createdAt: string;
  categories: Category[];
  content: string;
  author: Author;
  commentCount: number;
  likeCount: number;
  liked: boolean;
}

/**
 * GET) 게시글 상세 조회
 * @path postId
 */
export const getPostDetail = async (postId: number) => {
  const response = await axiosInstance.get<IApiResponse<IGetPostDetailResponse>>(
    `${API_SUB_URLS_V3}/posts/${postId}`
  );

  return response.data.data;
};
