import axios from 'axios';

export interface IS3UploadRequest {
  presignedUrl: string;
  file: File;
}

/**
 * PUT) S3 이미지 업로드
 * @body file
 */
export const uploadToS3 = async (data: IS3UploadRequest) => {
  const response = await axios.put(data.presignedUrl, data.file, {
    headers: { 'Content-Type': data.file.type },
    withCredentials: false,
  });

  return response.status === 200;
};
