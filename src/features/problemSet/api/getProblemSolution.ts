import { API_SUB_URLS } from '@/constants/apiConfig';
import axiosInstance from '@/shared/lib/axios';
import { IApiResponse } from '@/shared/types/ApiResponse';

interface ISolutionCode {
  cpp: string;
  java: string;
  python: string;
}

export interface IGetProblemSolutionResponse {
  problemNumber: number;
  tier: string;
  title: string;
  timeLimit: number;
  memoryLimit: number;
  submissionCnt: number;
  answerCnt: number;
  correctPplCnt: number;
  correctRate: number;
  description: string;
  inputDescription: string;
  outputDescription: string;
  inputExample: string;
  outputExample: string;
  problemCheck: string;
  algorithm: string;
  problemSolving: string;
  bojUrl: string;
  solutionCode: ISolutionCode;
}

/**
 * GET) 알고리즘 문제에 대한 해설 조회
 *  @path problemNumber
 */

export const getProblemSolution = async (problemNumber: number) => {
  const response = await axiosInstance.get<IApiResponse<IGetProblemSolutionResponse>>(
    `${API_SUB_URLS}/problem-set/${problemNumber}/solution`
  );

  return response?.data?.data;
};
