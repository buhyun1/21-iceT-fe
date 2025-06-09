// src/apis/authApi.ts
import axios from './axios';
import { IApiResponse } from '@/@types/api';

const V1_SUB_URL = '/api/backend/v1/auth';
// 토큰 갱신 전용 axios 인스턴스
const refreshAxios = axios.create({
  baseURL: axios.defaults.baseURL,
  withCredentials: true,
});

/**
 * POST) 카카오 로그인
 * @param code
 */
export const loginWithKakao = async (code: string) => {
  const response = await axios.get<
    IApiResponse<{ email: string; name: string; isRegistered: boolean }>
  >(`${V1_SUB_URL}/callback?code=${code}`);

  return response.data.data;
};

/**
 * POST) 토큰 리프레쉬
 */
export const refreshAccessToken = async () => {
  const response = await refreshAxios.post<IApiResponse<null>>(`${V1_SUB_URL}/refresh`);

  return response.data.data;
};

/**
 *  POST) 로그아웃
 */
export const logout = async () => {
  const response = await axios.post<IApiResponse<{ redirectUrl: string }>>(`${V1_SUB_URL}/logout`);

  return response.data.data;
};
