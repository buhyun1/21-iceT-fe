// src/hooks/mutations/useProblemMutations.ts
import { useMutation } from '@tanstack/react-query';
import { registerSurvey } from '../api/registerSurvey';

export interface IProblemSurvey {
  problemId: number;
  isSolved: boolean;
  difficultyLevel: string;
}

export interface IProblemSurveyRequest {
  problemSetId: number;
  responses: IProblemSurvey[];
}

/**
 * 설문 제출 뮤테이션 훅
 */
export const useRegisterSurvey = () => {
  return useMutation({
    mutationFn: (data: IProblemSurveyRequest) => registerSurvey(data),
    onSuccess: async () => {
      // 성공 시 관련 쿼리 무효
    },
  });
};
