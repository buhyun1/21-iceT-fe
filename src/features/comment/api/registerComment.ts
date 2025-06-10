import { API_SUB_URLS_V3 } from '@/constants/apiConfig';
import axiosInstance from '@/shared/lib/axios';
import { IApiResponse } from '@/shared/types/ApiResponse';

/**
 * 댓글 등록
 * @param postId
 * @returns commentId
 */
const registerComment = async (postId: number) => {
  const response = await axiosInstance.post<IApiResponse<{ commentId: number }>>(
    `${API_SUB_URLS_V3}/posts/${postId}/comments`
  );

  return response.data.data;
};

export default registerComment;
