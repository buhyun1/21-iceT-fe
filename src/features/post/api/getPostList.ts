import { API_SUB_URLS_V3 } from '@/constants/apiConfig';
import axiosInstance from '@/shared/lib/axios';
import { IApiResponse } from '@/shared/types/ApiResponse';

export type Category = {
  cagegoryId: number;
  categoryName: string;
};

export type Author = {
  userId: number;
  nickname: string;
  imgUrl: string;
};

export type Posts = {
  postId: number;
  problemNumber: number;
  title: string;
  createdAt: string;
  categories: Category[];
  author: Author;
  commentCount: number;
  likeCount: number;
};

export interface IGetPostListResponse {
  nextCursorId: number;
  hasNext: boolean;
  posts: Posts[];
}

export interface IGetPostListProps {
  category?: string[];
  keyword?: string;
  pageParam?: number | null;
}

const getPostList = async ({ keyword, category, pageParam }: IGetPostListProps) => {
  console.log(category);
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
  console.log(response.data.data);

  return response.data.data;
};

export default getPostList;
