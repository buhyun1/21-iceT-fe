import axios from './axios';
import { IApiResponse } from '@/@types/api';
import { IProfileImageResponse, IS3UploadRequest } from '@/@types/image';

const V1_SUB_URL = '/api/backend/v1';

/**
 * GET) 사용자 프로필 업로드를 위한 presigned url 요청
 * @QueryParam
 * @return fileUrl, presignedUrl
 */
export const getPresignedUrl = async (fileName: string) => {
  const response = await axios.get<IApiResponse<IProfileImageResponse>>(
    `${V1_SUB_URL}/upload/presigned-url?fileName=${fileName}`
  );

  return response.data.data;
};

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
