import { API_SUB_URLS_V3 } from '@/constants/apiConfig';
import axiosInstance from '@/shared/lib/axios';

export interface IDeleteAlarmsProps {
  userId: number;
  alarmId: number;
}

const deleteAlarm = async (data: IDeleteAlarmsProps) => {
  const response = await axiosInstance.delete(`${API_SUB_URLS_V3}/alarms/${data.alarmId}`, {
    params: { alarmId: data.alarmId },
  });

  return response.data.data;
};

export default deleteAlarm;
