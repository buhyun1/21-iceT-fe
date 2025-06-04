import { formatDate } from '@/utils/formatDate';
import { useNavigate } from 'react-router-dom';

interface IAuthor {
  userId: number;
  nickname: string;
  imgUrl: string;
}

export interface IPostItem {
  postId: number;
  title: string;
  content: string;
  author: IAuthor;
  countLike: number;
  countComment: number;
  createdAt: string;
}

interface IPostItemProps {
  post: IPostItem;
}

const PostItem = ({ post }: IPostItemProps) => {
  const navigate = useNavigate();

  const onClickPost = () => {
    navigate(`/post/${post.postId}`);
  };

  return (
    <div
      onClick={onClickPost}
      className="bg-surface p-4 border-b border-border cursor-pointer hover:bg-gray-50 transition-colors"
    >
      {/* 제목 */}
      <h3 className="text-base font-semibold text-text-primary mb-2 line-clamp-2">{post.title}</h3>

      {/* 내용 미리보기 */}
      <p className="text-sm text-text-secondary mb-3 line-clamp-2">{post.content}</p>

      {/* 하단 정보 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs text-text-secondary">{post.author.nickname}</span>
          <span className="text-xs text-text-secondary">·</span>
          <span className="text-xs text-text-secondary">{formatDate(post.createdAt)}</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <span className={`text-xs ${post.countLike ? 'text-red-500' : 'text-text-secondary'}`}>
              {post.countLike ? '❤️' : '🤍'}
            </span>
            <span className="text-xs text-text-secondary">{post.countLike}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-xs text-text-secondary">💬</span>
            <span className="text-xs text-text-secondary">{post.countComment}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostItem;
