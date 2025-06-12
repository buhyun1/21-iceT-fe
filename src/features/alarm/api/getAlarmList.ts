import { API_SUB_URLS_V3 } from '@/constants/apiConfig';
import axiosInstance from '@/shared/lib/axios';
import { IApiResponse } from '@/shared/types/ApiResponse';

interface IGetAlarmListProps {
  receiverId: number;
  pageParam: number | null;
}

type Alarm = {
  id: number;
  post_id: number;
  sender_id: number;
  sender_name: string;
  type: string;
  is_read: boolean;
  created_at: string;
};

interface IGetAlarmListResponse {
  alarms: Alarm[];
  last_alarm_id: number;
  has_next: boolean;
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
