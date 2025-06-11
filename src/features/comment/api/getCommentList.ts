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
  nextCursorId: number | null;
  hasNext: boolean;
  comments: Comment[];
}

interface IGetCommentListProps {
  pageParam: number | null;
  postId: number;
}

const getCommentList = async ({ pageParam, postId }: IGetCommentListProps) => {
  const url = pageParam
    ? `${API_SUB_URLS_V3}/posts/${postId}/comments?cursorId=${pageParam}`
    : `${API_SUB_URLS_V3}/posts/${postId}/comments`;

  const response = await axiosInstance.get<IApiResponse<ICommentListResponse>>(url);

  return response.data.data;
};

export default getCommentList;
