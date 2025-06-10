import { API_SUB_URLS_V3 } from '@/constants/apiConfig';
import axiosInstance from '@/shared/lib/axios';
import { IApiResponse } from '@/shared/types/ApiResponse';

interface IRegisterLikeResponse {
  postId: number;
  liked: boolean;
  likeCount: number;
}

/**
 * 좋아요 등록
 * @param postId
 * @returns postId, liked, likeCount
 */
const registerLike = async (postId: number) => {
  const response = await axiosInstance.post<IApiResponse<IRegisterLikeResponse>>(
    `${API_SUB_URLS_V3}/posts/${postId}/likes`
  );

  return response.data.data;
};

export default registerLike;
