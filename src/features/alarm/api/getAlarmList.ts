import { API_SUB_URLS_V3 } from '@/constants/apiConfig';
import axiosInstance from '@/shared/lib/axios';
import { IApiResponse } from '@/shared/types/ApiResponse';
import { Alarm } from '../types/alarm';

interface IGetAlarmListProps {
  receiverId: number;
  pageParam: number | null;
}

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
