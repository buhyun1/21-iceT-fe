import { useMutation } from '@tanstack/react-query';
import { createPost, ICreatePostRequest } from '../api/createPost';
import { useNavigate } from 'react-router-dom';

/**
 * 게시글 등록 뮤테이션 훅
 * */
export const useCreatePost = (data: ICreatePostRequest) => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: () => createPost(data),
    onSuccess: response => {
      // response에서 postId 추출하여 해당 게시글 상세 페이지로 이동
      if (response?.postId) {
        navigate(`/posts/${response.postId}`);
      } else {
        navigate('/posts');
      }
    },
    onError: () => {
      alert('게시글 등록에 실패했습니다');
    },
  });
};
