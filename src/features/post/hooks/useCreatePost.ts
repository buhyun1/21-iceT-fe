import { useMutation } from '@tanstack/react-query';
import { createPost, ICreatePostRequest } from '../api/createPost';
import { useNavigate } from 'react-router-dom';

/**
 * 게시글 등록 뮤테이션 훅
 * */
export const useCreatePost = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: ICreatePostRequest) => createPost(data),
  });
};
