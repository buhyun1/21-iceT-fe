import { API_SUB_URLS_V3 } from '@/constants/apiConfig';
import axiosInstance from '@/shared/lib/axios';
import { IApiResponse } from '@/shared/types/ApiResponse';
import { Posts } from './getPostList';

const getHotPosts = async () => {
  const response = await axiosInstance.get<IApiResponse<Posts[]>>(`${API_SUB_URLS_V3}/posts/top`);

  return response.data.data;
};

export default getHotPosts;
