import { API_SUB_URLS_V3 } from '@/constants/apiConfig';
import axiosInstance from '@/shared/lib/axios';
import { IApiResponse } from '@/shared/types/ApiResponse';
import { Author, Category } from './getPostList';

interface IGetHotPostResponse {
  postId: number;
  title: string;
  createdAt: string;
  categories: Category;
  content: string;
  author: Author;
  commentCount: number;
  likeCount: number;
  liked: boolean;
}

const getHotPosts = async () => {
  const response = await axiosInstance.get<IApiResponse<IGetHotPostResponse>>(
    `${API_SUB_URLS_V3}/posts/top`
  );

  return response.data.data;
};

export default getHotPosts;
