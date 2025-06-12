import { API_SUB_URLS_V3 } from '@/constants/apiConfig';
import axiosInstance from '@/shared/lib/axios';
import { ICreatePostRequest } from './createPost';

export interface IEditPostProps {
  postId: number;
  post: ICreatePostRequest;
}

const editPost = async (data: IEditPostProps) => {
  const response = await axiosInstance.patch(
    `${API_SUB_URLS_V3}/posts/${data.postId}`,

    { ...data.post }
  );

  return response.data.data;
};

export default editPost;
