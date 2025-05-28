// src/hooks/queries/useProblemQueries.ts
import { useQuery } from '@tanstack/react-query';
import { getProblem } from '../api/getProblem';
import { queryKeys } from '@/constants/queryKeys';
import { IGetProblemSetResponse } from '../api/getProblem';

/**
 * 특정 날짜의 문제 세트를 조회하는 훅
 * @param date YYYY-MM-DD 형식의 날짜
 */
export const useProblemSet = (date: string) => {
  return useQuery<IGetProblemSetResponse>({
    queryKey: queryKeys.problems.set(date),
    queryFn: () => getProblem(date),
    staleTime: Infinity,
    gcTime: 1000 * 60 * 60 * 3,
    enabled: !!date,
    refetchOnMount: true,
  });
};
