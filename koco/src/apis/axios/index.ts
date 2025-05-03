// src/apis/axios.ts
import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

// Create a base axios instance
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080',
  timeout: 10000,
  withCredentials: true, // HttpOnly 쿠키 전송을 위해 필요
  headers: {
    'Content-Type': 'application/json',
  },
});

// 토큰 갱신 중인지 확인하는 플래그
let isRefreshing = false;
// 요청 큐 저장
let failedQueue: {
  resolve: (value: unknown) => void;
  reject: (reason?: unknown) => void;
  config: InternalAxiosRequestConfig;
}[] = [];

// 요청 큐 처리 함수
const processQueue = (error: AxiosError | null, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      console.log(token);
      prom.resolve(axiosInstance(prom.config));
    }
  });

  failedQueue = [];
};

// 토큰 갱신 전용 axios 인스턴스
const refreshAxios = axios.create({
  baseURL: axiosInstance.defaults.baseURL,
  withCredentials: true,
});

// 토큰 갱신 함수
const refreshToken = async () => {
  try {
    const response = await refreshAxios.post('/api/v1/auth/refresh');

    return response.status === 200;
  } catch {
    return false;
  }
};

// 요청 인터셉터
axiosInstance.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터
axiosInstance.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    const originalRequest = error.config;

    // 401 에러이고 재시도하지 않은 요청인 경우
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // 이미 토큰 갱신 중이면 요청을 큐에 추가
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve,
            reject,
            config: originalRequest,
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // 토큰 갱신 시도
        const success = await refreshToken();

        if (success) {
          // 성공하면 큐 처리하고 원래 요청 재시도
          processQueue(null);
          isRefreshing = false;

          // HttpOnly 쿠키이므로 헤더 수정 불필요
          return axiosInstance(originalRequest);
        } else {
          // 실패하면 로그인 페이지로 리다이렉트
          processQueue(error);
          isRefreshing = false;
          window.location.href = '/';

          return Promise.reject(error);
        }
      } catch (refreshError) {
        processQueue(refreshError as AxiosError);
        isRefreshing = false;
        window.location.href = '/';

        return Promise.reject(refreshError);
      }
    }

    // 다른 에러 처리
    return Promise.reject(error);
  }
);

export default axiosInstance;
