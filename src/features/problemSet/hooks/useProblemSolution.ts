import { useQuery } from '@tanstack/react-query';
import { getProblemSolution, IGetProblemSolutionResponse } from '../api/getProblemSolution';
import { queryKeys } from '@/constants/queryKeys';

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
