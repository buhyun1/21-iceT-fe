import { IS3UploadRequest } from '@/@types/image';
import { uploadToS3 } from '@/apis/imageApi';
import { useMutation } from '@tanstack/react-query';

export const useUploadS3 = () => {
  return useMutation({
    mutationFn: (data: IS3UploadRequest) => uploadToS3(data),
    onSuccess: () => {
      // 성공 시 관련 쿼리 무효화
    },
  });
};
