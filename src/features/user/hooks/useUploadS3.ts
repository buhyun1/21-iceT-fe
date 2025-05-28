import { uploadToS3 } from '../api';
import { useMutation } from '@tanstack/react-query';

export interface IS3UploadRequest {
  presignedUrl: string;
  file: File;
}

export const useUploadS3 = () => {
  return useMutation({
    mutationFn: (data: IS3UploadRequest) => uploadToS3(data),
  });
};
