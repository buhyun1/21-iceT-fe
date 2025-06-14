import { useMutation } from '@tanstack/react-query';
import { createPost, ICreatePostRequest } from '../api/createPost';

/**
 * 게시글 등록 뮤테이션 훅
 * */
export const useCreatePost = () => {
  return useMutation({
    mutationFn: (data: ICreatePostRequest) => createPost(data),
  });
};
