import { API_SUB_URLS } from '@/constants/apiConfig';
import axiosInstance from '@/shared/lib/axios';
import { IApiResponse } from '@/shared/types/ApiResponse';

export interface IStudyStat {
  categoryId: number;
  categoryName: string;
  correctRate: number;
}

export interface IStudyStatsResponse {
  studyStats: IStudyStat[];
}
/**
 * Get) 사용자 알고리즘 스탯 조회
 * @returns studyStats
 */
export const getUserStudyStats = async () => {
  const response = await axiosInstance.get<IApiResponse<IStudyStatsResponse>>(
    `${API_SUB_URLS}/users/algorithm-stats`
  );

  return response.data.data;
};
