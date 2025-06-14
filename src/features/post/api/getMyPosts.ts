import { API_SUB_URLS, API_SUB_URLS_V3 } from '@/constants/apiConfig';
import axiosInstance from '@/shared/lib/axios';
import { IApiResponse } from '@/shared/types/ApiResponse';

type Category = {
  categoryId: number;
  categoryName: string;
};

type Author = {
  userId: number;
  nickname: string;
  imgUrl: string;
};

type Post = {
  postId: number;
  problemNumber: number;
  title: string;
  createdAt: string; // ISO 문자열 (예: "2025-06-10T00:21:02.664862")
  categories: Category[];
  author: Author;
  commentCount: number;
  likeCount: number;
};

export interface IGetMyPostsResponse {
  nextCursorId: number;
  hasNext: boolean;
  posts: Post[];
}

const getMyPosts = async (cursorId: number | null) => {
  const params = cursorId !== null ? { cursorId } : {};
  const response = await axiosInstance.get<IApiResponse<IGetMyPostsResponse>>(
    `${API_SUB_URLS}/users/myposts`,
    {
      params,
    }
  );

  return response.data.data;
};

export default getMyPosts;
