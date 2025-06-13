import { useMutation } from '@tanstack/react-query';
import confirmAlarm, { IConfirmAlarmProps } from '../api/confirmAlarm';

const useConfirmAlarm = () => {
  return useMutation({
    mutationFn: (data: IConfirmAlarmProps) => confirmAlarm(data),
  });
};

export default useConfirmAlarm;
