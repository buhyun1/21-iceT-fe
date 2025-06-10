import { API_SUB_URLS_V3 } from '@/constants/apiConfig';
import axiosInstance from '@/shared/lib/axios';
import { IApiResponse } from '@/shared/types/ApiResponse';

/**
 * 좋아요 취소
 * @param postId
 */
const deleteLike = async (postId: number) => {
  const response = await axiosInstance.delete<IApiResponse<null>>(
    `${API_SUB_URLS_V3}/posts/${postId}/likes`
  );

  return response.data.data;
};

export default deleteLike;
