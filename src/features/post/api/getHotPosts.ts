import { API_SUB_URLS_V3 } from '@/constants/apiConfig';
import axiosInstance from '@/shared/lib/axios';
import { IApiResponse } from '@/shared/types/ApiResponse';
import { Post } from '../types/post';

const getHotPosts = async () => {
  const response = await axiosInstance.get<IApiResponse<Post[]>>(`${API_SUB_URLS_V3}/posts/top`);

  return response.data.data;
};

export default getHotPosts;
