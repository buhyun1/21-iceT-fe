import { API_SUB_URLS_V3 } from '@/constants/apiConfig';
import axiosInstance from '@/shared/lib/axios';

export interface IEditCommentProps {
  postId: number;
  commentId: number;
  content: string;
}

const editComment = async (data: IEditCommentProps) => {
  const response = await axiosInstance.put(
    `${API_SUB_URLS_V3}/posts/${data.postId}/comments/${data.commentId}`,
    { content: data.content }
  );

  return response.data.data;
};

export default editComment;
