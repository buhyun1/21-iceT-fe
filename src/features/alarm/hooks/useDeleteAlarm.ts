import { useMutation } from '@tanstack/react-query';
import deleteAlarm, { IDeleteAlarmsProps } from '../api/deleteAlarm';

const useDeleteAlarm = () => {
  return useMutation({
    mutationFn: (data: IDeleteAlarmsProps) => deleteAlarm(data),
  });
};

export default useDeleteAlarm;
