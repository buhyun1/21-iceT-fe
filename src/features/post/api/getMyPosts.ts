import { API_SUB_URLS } from '@/constants/apiConfig';
import axiosInstance from '@/shared/lib/axios';
import { IApiResponse } from '@/shared/types/ApiResponse';
import { Post } from '../types/post';

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
