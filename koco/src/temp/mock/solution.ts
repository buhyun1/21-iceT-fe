import { IGetProblemSolutionResponse } from '@/apis/problemApi';

const MOCK_SOLUTION_DATA: IGetProblemSolutionResponse = {
  problemNumber: 1136,
  tier: 'Silver 2',
  title: '컵 쌓기',
  timeLimit: 1,
  memoryLimit: 1024,
  submissionCnt: 13243,
  answerCnt: 123,
  correctPplCnt: 50,
  correctRate: 50,
  description: '주어진 수 N개 중에서 소수가 몇 개인지 찾아서 출력하는 프로그램',
  inputDescription: '첫 줄에 수의 개수 N이 주어진다. N은 100이하이다...',
  outputDescription: '주어진 수들 중 소수의 개수를 출력한다.',
  inputExample: '4\n1 3 5 7',
  outputExample: '3',
  problemCheck: '문제에 대한 개요 설명이 들어갑니다.',
  algorithm: '사용해야 할 알고리즘 종류에 대한 설명이 들어갑니다.',
  problemSolving: '문제 해결 방법 및 접근 방식에 대한 설명이 들어갑니다.',
  solutionCode: {
    cpp: '#include <iostream> ...',
    java: 'public class Main { ... }',
    python: 'def is_prime(n): ...',
  },
};

export default MOCK_SOLUTION_DATA;
