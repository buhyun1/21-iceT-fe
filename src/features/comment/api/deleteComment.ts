import { API_SUB_URLS_V3 } from '@/constants/apiConfig';
import axiosInstance from '@/shared/lib/axios';

export interface IDeleteCommentProps {
  postId: number;
  commentId: number;
}

const deleteComment = async (data: IDeleteCommentProps) => {
  const response = await axiosInstance.delete(
    `${API_SUB_URLS_V3}/posts/${data.postId}/comments/${data.commentId}`
  );

  return response.data.data;
};

export default deleteComment;
