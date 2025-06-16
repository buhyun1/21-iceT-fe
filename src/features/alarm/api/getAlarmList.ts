import { API_SUB_URLS_V3 } from '@/constants/apiConfig';
import axiosInstance from '@/shared/lib/axios';
import { IApiResponse } from '@/shared/types/ApiResponse';

interface IGetAlarmListProps {
  receiverId: number;
  pageParam: number | null;
}

export type Alarm = {
  id: number;
  senderId: number;
  postId: number;
  senderNickname: string;
  postTitle: string;
  createdAt: string;
  alarmType: string;
};

interface IGetAlarmListResponse {
  alarms: Alarm[];
  cursorId: number;
  hasNext: boolean;
  totalCount: number;
}

const getAlarmList = async (data: IGetAlarmListProps) => {
  const params =
    data.pageParam !== null
      ? { receiverId: data.receiverId, cursorId: data.pageParam }
      : { receiverId: data.receiverId };
  const response = await axiosInstance.get<IApiResponse<IGetAlarmListResponse>>(
    `${API_SUB_URLS_V3}/alarms`,
    { params }
  );

  return response.data.data;
};

export default getAlarmList;
