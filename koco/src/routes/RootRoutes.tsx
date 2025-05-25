import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout';
import LoginPage from '@/pages/Login';
import FirstLoginPage from '@/pages/FirstLoginPage';
import MainPage from '@/pages/MainPage';
import KakaoCallback from '@/pages/KakaoCallbackPage';
import { ProtectedRoute } from './ProtectedRoute';
import { AuthProvider } from '@/context/AuthContext';
import GoogleAnalytics from '@/utils/GoogleAnalytics';
import React, { Suspense } from 'react';
import Spinner from '@/components/ui/Spinner';

const SurveyPage = React.lazy(() => import('@/pages/SurveyPage'));
const ProblemListPage = React.lazy(() => import('@/pages/ProblemListPage'));
const ProblemSolutionPage = React.lazy(() => import('@/pages/ProblemSolutionPage'));

const RootRoutes = () => {
  return (
    <BrowserRouter basename={'/'}>
      <AuthProvider>
        <GoogleAnalytics />
        <Suspense fallback={<Spinner text="로딩중..." />}>
          <Routes>
            <Route element={<AppLayout />}>
              <Route index element={<LoginPage />} />
              <Route path="/oauth/kakao/callback" element={<KakaoCallback />} />

              {/* 로그인 시 접근 가능한 페이지들 */}

              <Route element={<ProtectedRoute />}>
                <Route path="/complete-profile" element={<FirstLoginPage />} />
                <Route path="/home" element={<MainPage />} />
                <Route path="/survey" element={<SurveyPage />} />
                <Route path="/problems" element={<ProblemListPage />} />
                <Route path="/problems/:id" element={<ProblemSolutionPage />} />
              </Route>
            </Route>
          </Routes>
        </Suspense>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default RootRoutes;
