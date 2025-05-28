import { API_SUB_URLS } from '@/constants/apiConfig';
import axiosInstance from '@/shared/lib/axios';
import { IApiResponse } from '@/shared/types/ApiResponse';

export interface IProblemItem {
  problemId: number;
  problemNumber: number;
  title: string;
  tier: string;
}

export interface IGetProblemSetResponse {
  date: string;
  problemSetId: number;
  isAnswered: boolean;
  problems: IProblemItem[];
}

/**
 * GET) 특정 날짜에 출제된 출제문제집 조회
 * @param date
 */
export const getProblem = async (date: string) => {
  const response = await axiosInstance.get<IApiResponse<IGetProblemSetResponse>>(
    `${API_SUB_URLS}/problem-set?date=${date}`
  );

  return response.data.data;
};
