import { API_SUB_URLS_V3 } from '@/constants/apiConfig';
import axiosInstance from '@/shared/lib/axios';

export interface IConfirmAlarmProps {
  alarmId: number;
  userId: number;
}

/**
 * 알람 확인
 * @param data
 * @returns
 */
const confirmAlarm = async (data: IConfirmAlarmProps) => {
  const response = await axiosInstance.patch(`${API_SUB_URLS_V3}/alarms/${data.alarmId}/read`, {
    params: { userId: data.userId },
  });

  return response.data.data;
};

export default confirmAlarm;
