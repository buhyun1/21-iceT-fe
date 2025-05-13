// src/hooks/mutations/useProblemMutations.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { registerSurvey } from '@/apis/problemApi';
import { queryKeys } from '../queries/queryKeys';
import { IProblemSurveyRequest } from '@/@types/problem';

/**
 * 설문 제출 뮤테이션 훅
 */
export const useRegisterSurvey = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: IProblemSurveyRequest) => registerSurvey(data),
    onSuccess: () => {
      // 성공 시 관련 쿼리 무효

      const today = new Date().toISOString().split('T')[0];
      queryClient.invalidateQueries({ queryKey: queryKeys.problems.set(today) });
      //queryClient.invalidateQueries({ queryKey: queryKeys.users.dashboard(today) });
    },
  });
};
