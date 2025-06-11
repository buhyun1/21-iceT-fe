import { API_SUB_URLS_V3 } from '@/constants/apiConfig';
import axiosInstance from '@/shared/lib/axios';
import { IApiResponse } from '@/shared/types/ApiResponse';
export interface IGetPostListProps {
  category?: string;
  keyword?: string;
  cursorId?: number;
}

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

const getPostList = async (data: IGetPostListProps) => {
  const response = await axiosInstance.get<IApiResponse<IGetPostListProps>>(
    `${API_SUB_URLS_V3}/posts`,
    {
      params: {
        category: data.category || '',
        keyword: data.keyword || '',
        cursorId: data.cursorId || '',
      },
    }
  );

  return response.data;
};

export default getPostList;
