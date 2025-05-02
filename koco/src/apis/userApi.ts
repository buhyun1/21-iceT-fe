// src/apis/userApi.ts
import { IGetUserDashboardResponse } from '@/@types/user';
import axios from './axios';
import { IApiResponse } from '@/@types/api';

const V1_SUB_URL = '/api/v1/users';

/**
 * POST) 사용자 추가 정보 등록
 * @request_body nickname, profileImgUrl, statusMsg
 */

export interface ICompleteProfileRequest {
  nickname: string;
  profileImgUrl: string;
  statusMsg: string;
}

export const completeProfile = async ({
  nickname,
  profileImgUrl,
  statusMsg,
}: ICompleteProfileRequest) => {
  const response = await axios.post<IApiResponse<null>>(`${V1_SUB_URL}/me`, {
    nickname,
    profileImgUrl,
    statusMsg,
  });

  return response.data.data;
};

/**
 *  GET) 사용자 개인 대시보드 조회
 * @params date
 */

export const getUserDashboard = async (date: string) => {
  const response = await axios.post<IApiResponse<IGetUserDashboardResponse>>(
    `${V1_SUB_URL}/dashboard?date=${date}`
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
