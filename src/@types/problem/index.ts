export interface IProblemSurvey {
  problemId: number;
  isSolved: boolean;
  difficultyLevel: string;
}

export interface IProblemSurveyRequest {
  problemSetId: number;
  responses: IProblemSurvey[];
}

export interface IProblemItem {
  problemId: number;
  problemNumber: number;
  title: string;
  tier: string;
}

export interface IGetProblemSetResponse {
  date: string;
  problemSetId: number;
  isAnswered: boolean;
  problems: IProblemItem[];
}
