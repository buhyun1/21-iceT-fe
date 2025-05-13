import { IGetProblemSetResponse } from '@/@types/problem';

const MOCK_DATE_PROBLEM: IGetProblemSetResponse = {
  date: '2025-04-10',
  problemSetId: 42,
  isAnswered: false,
  problems: [
    {
      problemId: 123,
      problemNumber: 1136,
      title: '컵 쌓기',
      tier: 'Bronze II',
    },
    {
      problemId: 111,
      problemNumber: 1137,
      title: '수열 만들기',
      tier: 'Silver IV',
    },
  ],
};

export default MOCK_DATE_PROBLEM;
