import { IProblemSurveyRequest, IGetProblemSetResponse } from '@/@types/problem';
import axios from './axios';
import { IApiResponse } from '@/@types/api';

const V1_SUB_URL = '/api/backend/v1/problem-set';

/**
 * POST) 설문 등록
 */
export const registerSurvey = async (data: IProblemSurveyRequest) => {
  const response = await axios.post<IApiResponse<{ surveyId: number[] }>>(
    `${V1_SUB_URL}/surveys`,
    data
  );

  return response.data.data;
};

/**
 * GET) 특정 날짜에 출제된 출제문제집 조회
 * @param date
 */
export const getProblem = async (date: string) => {
  const response = await axios.get<IApiResponse<IGetProblemSetResponse>>(
    `${V1_SUB_URL}?date=${date}`
  );

  return response.data.data;
};

/**
 * GET) 알고리즘 문제에 대한 해설 조회
 *  @path problemNumber
 */

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

export const getProblemSolution = async (problemNumber: number) => {
  const response = await axios.get<IApiResponse<IGetProblemSolutionResponse>>(
    `${V1_SUB_URL}/${problemNumber}/solution`
  );

  return response?.data?.data;
};
