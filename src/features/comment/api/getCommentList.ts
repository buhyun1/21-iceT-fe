import { API_SUB_URLS_V3 } from '@/constants/apiConfig';
import axiosInstance from '@/shared/lib/axios';
import { IApiResponse } from '@/shared/types/ApiResponse';

type Comment = {
  id: number;
  comment: string;
  author: Author;
  createdAt: string;
};

type Author = {
  userId: number;
  nickname: string;
  imgUrl: string;
};
interface ICommentListResponse {
  postId: number;
  nextCursorId: number;
  hasNext: boolean;
  comments: Comment[];
}

const getCommentList = async (postId: number) => {
  const response = await axiosInstance.get<IApiResponse<ICommentListResponse>>(
    `${API_SUB_URLS_V3}/posts/${postId}/comments`
  );

  return response.data.data;
};

export default getCommentList;
