// src/context/AuthContext.tsx
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface IAuthContext {
  isAuthenticated: boolean;
  loading: boolean;
  loginUserContext: () => void;
  logoutUserContext: () => void;
}

const AuthContext = createContext<IAuthContext | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);

  // 로그인 상태 저장
  const loginUserContext = () => {
    localStorage.setItem('koco_auth_flag', 'true');
    setIsAuthenticated(true);
  };

  // 로그아웃 상태 저장
  const logoutUserContext = () => {
    try {
      localStorage.removeItem('koco_auth_flag');
      setIsAuthenticated(false);
    } catch (error) {
      console.error('로그아웃 실패', error);
    }
  };

  useEffect(() => {
    const authFlag = localStorage.getItem('koco_auth_flag');
    setIsAuthenticated(!!authFlag);
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        loading,
        loginUserContext,
        logoutUserContext,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth는 AuthProvider 내에서 사용되어야 합니다');
  }

  return context;
};
