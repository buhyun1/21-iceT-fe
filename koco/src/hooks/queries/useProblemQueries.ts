// src/hooks/queries/useProblemQueries.ts
import { useQuery } from '@tanstack/react-query';
import { getProblem, getProblemSolution, IGetProblemSolutionResponse } from '@/apis/problemApi';
import { queryKeys } from './queryKeys';
import { IGetProblemSetResponse } from '@/@types/problem';

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

/**
 * 특정 문제 번호의 해설을 조회하는 훅
 * @param problemNumber 문제 번호
 */
export const useProblemSolution = (problemNumber: number) => {
  return useQuery<IGetProblemSolutionResponse>({
    queryKey: queryKeys.problems.solution(problemNumber),
    queryFn: () => getProblemSolution(problemNumber),
    enabled: !!problemNumber,
    staleTime: Infinity,
    gcTime: 1000 * 60 * 60 * 3,
  });
};
