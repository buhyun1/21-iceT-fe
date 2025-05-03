// src/apis/authApi.ts
import axios from './axios';
import { IApiResponse } from '@/@types/api';

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
    IApiResponse<{ email: string; name: string; registered: boolean }>
  >(`/api/v1/auth/callback?code=${code}`);

  return response.data.data;
};

/**
 * POST) 토큰 리프레쉬
 */
export const refreshAccessToken = async () => {
  const response = await refreshAxios.post<IApiResponse<null>>('/api/v1/auth/refresh');

  return response.data.data;
};

/**
 *  POST) 로그아웃
 * @returns redirectUrl
 */
export const logout = async () => {
  const response = await axios.post<IApiResponse<{ redirectUrl: string }>>('/api/v1/auth/logout');

  return response.data.data;
};
