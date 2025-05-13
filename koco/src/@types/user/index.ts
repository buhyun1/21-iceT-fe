export interface IGetUserDashboardResponse {
  userId: number;
  nickname: string;
  statusMessage: string;
  profileImgUrl: string;
  todayProblemSetId: number;
  continuousAttendance: number;
  studyStats: IStudyStat[];
}

export interface IStudyStat {
  categoryId: number;
  categoryName: string;
  correctRate: number;
}

export interface IGetUserProfileResponse {
  userId: number;
  nickname: string;
  statusMessage: string;
  profileImageUrl: string;
}

export interface IStudyStat {
  categoryId: number;
  categoryName: string;
  correctRate: number;
}

export interface IStudyStatsResponse {
  studyStats: IStudyStat[];
}
