import { API_SUB_URLS_V3 } from '@/constants/apiConfig';
import axiosInstance from '@/shared/lib/axios';

export interface IDeletePostProps {
  postId: number;
}

const deletePost = async (data: IDeletePostProps) => {
  const response = await axiosInstance.delete(`${API_SUB_URLS_V3}/posts/${data.postId}`);

  return response.data.data;
};

export default deletePost;
