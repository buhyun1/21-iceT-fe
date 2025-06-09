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
    onSuccess: response => {
      // response에서 postId 추출하여 해당 게시글 상세 페이지로 이동
      if (response?.postId) {
        navigate(`/post/${response.postId}`);
      } else {
        navigate('/posts');
      }
    },
    onError: (error: any) => {
      if (error.response?.data?.code === 'BAD_REQUEST') {
        const message = error.response.data.message;
        alert(message);
      } else {
        alert('게시글 등록에 실패했습니다.');
      }
    },
  });
};
