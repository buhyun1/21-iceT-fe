// src/apis/userApi.ts
import {
  IGetUserDashboardResponse,
  IGetUserProfileResponse,
  IStudyStatsResponse,
} from '@/@types/user';
import axios from './axios';
import { IApiResponse } from '@/@types/api';

const V1_SUB_URL = '/api/backend/v1/users';

/**
 * POST) 사용자 추가 정보 등록
 * @request_body nickname, profileImg, statusMsg
 */

export interface ICompleteProfileRequest {
  nickname: string;
  profileImgUrl: string;
  statusMsg: string;
}

export const completeProfile = async (profileData: ICompleteProfileRequest) => {
  const response = await axios.post<IApiResponse<null>>(`${V1_SUB_URL}/me`, profileData);

  return response.data.data;
};

/**
 *  GET) 사용자 개인 대시보드 조회
 * @params date
 */

export const getUserDashboard = async (date: string) => {
  const response = await axios.get<IApiResponse<IGetUserDashboardResponse>>(
    `${V1_SUB_URL}/dashboard?date=${date}`
  );

  return response.data.data;
};

/**
 * GET) 사용자 정보 조회
 * @returns userId, nickname, statusMessage, profileImageUrl
 */
export const getUserProfile = async () => {
  const response = await axios.get<IApiResponse<IGetUserProfileResponse>>(`${V1_SUB_URL}/me`);

  return response.data.data;
};

/**
 * Get) 사용자 알고리즘 스탯 조회
 * @returns studyStats
 */
export const getUserStudyStats = async () => {
  const response = await axios.get<IApiResponse<IStudyStatsResponse>>(
    `${V1_SUB_URL}/algorithm-stats`
  );

  return response.data.data;
};
/**
 * DELETE) 탈퇴하기
 */
export const deleteUser = async () => {
  const response = await axios.delete<IApiResponse<null>>(`${V1_SUB_URL}/me`);

  return response.data.data;
};
