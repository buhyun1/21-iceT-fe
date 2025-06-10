import { API_SUB_URLS_V3 } from '@/constants/apiConfig';
import axiosInstance from '@/shared/lib/axios';
import { IApiResponse } from '@/shared/types/ApiResponse';

export interface IRegisterCommentProps {
  postId: number;
  content: string;
}

/**
 * 댓글 등록
 * @param postId
 * @returns commentId
 */
const registerComment = async (data: IRegisterCommentProps) => {
  const response = await axiosInstance.post<IApiResponse<{ commentId: number }>>(
    `${API_SUB_URLS_V3}/posts/${data.postId}/comments`,
    { content: data.content }
  );

  return response.data.data;
};

export default registerComment;
