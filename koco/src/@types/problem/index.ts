export interface IProblemSurvey {
  problemId: number;
  problemNumber: number;
  isSolved: boolean;
  difficultyLevel: string;
}

export interface IProblemSurveyRequest {
  problemSetId: number;
  responses: IProblemSurvey[];
}
