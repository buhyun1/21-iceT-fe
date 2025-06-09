// src/hooks/queries/useProblemQueries.ts
import { useQuery } from '@tanstack/react-query';
import { getProblem, getProblemSolution, IGetProblemSolutionResponse } from '@/apis/problemApi';
import { queryKeys } from './queryKeys';
//import MOCK_PROBLEM_DATA from '@/temp/mock/dateProblem';
import { IGetProblemSetResponse } from '@/@types/problem';
//import MOCK_SOLUTION_DATA from '@/temp/mock/solution';
/**
 * 특정 날짜의 문제 세트를 조회하는 훅
 * @param date YYYY-MM-DD 형식의 날짜
 */
export const useProblemSet = (date: string) => {
  return useQuery<IGetProblemSetResponse>({
    queryKey: queryKeys.problems.set(date),
    queryFn: () => getProblem(date),
    //initialData: MOCK_PROBLEM_DATA,
    enabled: !!date, // 날짜가 있을 때만 쿼리 활성화
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
    //initialData: MOCK_SOLUTION_DATA,
    enabled: !!problemNumber, // 문제 번호가 있을 때만 쿼리 활성화
    staleTime: 1000 * 60 * 60, // 1시간 (해설은 자주 변경되지 않음)
  });
};
