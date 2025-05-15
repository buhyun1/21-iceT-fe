import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080',
  timeout: 10000, // 10초로 증가
  withCredentials: true,
  // headers: {
  //   'Content-Type': 'application/json',
  // },
});

// 토큰 갱신 전용 axios 인스턴스
// const refreshAxios = axios.create({
//   baseURL: axiosInstance.defaults.baseURL,
//   withCredentials: true,
//   timeout: 5000, // 토큰 갱신은 좀 더 짧게
// });

// 토큰 갱신 함수
const refreshToken = async () => {
  try {
    const response = await axiosInstance.post('/api/backend/v1/auth/refresh');

    return response.status === 200;
  } catch {
    localStorage.removeItem('koco_auth_flag');

    return false;
  }
};

// 요청 인터셉터 - 로깅 및 요청 전 추가 처리
axiosInstance.interceptors.request.use(
  config => {
    // 파일을 포함한 요청인 경우 자동으로 'Content-Type'을 설정하지 않음
    if (config.data instanceof FormData) {
      // FormData는 axios가 자동으로 처리하도록 설정
      delete config.headers['Content-Type']; // 'Content-Type' 헤더를 제거
    }

    return config;
  },
  error => Promise.reject(error)
);

// 응답 인터셉터
axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    // 401 (인증 실패) 처리
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const success = await refreshToken();

        if (success) {
          return axiosInstance(originalRequest);
        } else {
          // 토큰 갱신 실패 시 로그인 페이지로
          window.location.href = '/';

          return Promise.reject(error);
        }
      } catch (refreshError) {
        window.location.href = '/';

        return Promise.reject(refreshError);
      }
    }

    // 500 에러 처리 - 서버 에러 로깅 및 사용자 알림
    if (error.response?.status === 500) {
      return Promise.reject(error);
    }

    // 네트워크 에러 처리
    if (error.message === 'Network Error') {
      alert('네트워크 연결을 확인해주세요.');

      return Promise.reject(error);
    }

    // 기타 에러 처리
    return Promise.reject(error);
  }
);

export default axiosInstance;
