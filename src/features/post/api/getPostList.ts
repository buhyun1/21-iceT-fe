import { API_SUB_URLS_V3 } from '@/constants/apiConfig';
import axiosInstance from '@/shared/lib/axios';
import { IApiResponse } from '@/shared/types/ApiResponse';
import { Post } from '../types/post';

export interface IGetPostListResponse {
  nextCursorId: number;
  hasNext: boolean;
  posts: Post[];
}

export interface IGetPostListProps {
  category?: string[];
  keyword?: string;
  pageParam?: number | null;
}

const getPostList = async ({ keyword, category, pageParam }: IGetPostListProps) => {
  const response = await axiosInstance.get<IApiResponse<IGetPostListResponse>>(
    `${API_SUB_URLS_V3}/posts`,
    {
      params: {
        ...(category && category.length > 0 && { category }),
        keyword: keyword || '',
        cursorId: pageParam || '',
      },
      paramsSerializer: {
        indexes: null,
      },
    }
  );

  return response.data.data;
};

export default getPostList;
