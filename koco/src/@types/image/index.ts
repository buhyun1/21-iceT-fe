export interface IProfileImageResponse {
  fileUrl: string;
  presignedUrl: string;
}

export interface IS3UploadRequest {
  presignedUrl: string;
  file: File;
}
