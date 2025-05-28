import { IApiResponse } from '@/shared/types/ApiResponse';
import axiosInstance from '@/shared/lib/axios';
import { API_SUB_URLS } from '@/constants/apiConfig';

export interface IProblemSurvey {
  problemId: number;
  isSolved: boolean;
  difficultyLevel: string;
}

export interface IProblemSurveyRequest {
  problemSetId: number;
  responses: IProblemSurvey[];
}
/**
 * POST) 설문 등록
 */
export const registerSurvey = async (data: IProblemSurveyRequest) => {
  const response = await axiosInstance.post<IApiResponse<{ surveyId: number[] }>>(
    `${API_SUB_URLS}/problem-set/surveys`,
    data
  );

  return response.data.data;
};
