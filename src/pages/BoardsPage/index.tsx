import { formatBaekjoonTier } from '@/features/problemSet/utils/convertTier';
import { getTierRank } from '@/utils/getTierRank';

export interface IPostItem {
  id: number;
  title: string;
  content: string;
  authorNickname: string;
  authorProfileImg: string;
  problemNumber?: number;
  problemTitle?: string;
  tier?: string;
  algorithm?: string;
  likeCount: number;
  commentCount: number;
  createdAt: string;
  isLiked: boolean;
}

interface IPostItemProps {
  post: IPostItem;
  onClick: () => void;
}

const PostItem = ({ post, onClick }: IPostItemProps) => {
  const tierWithSublevel = post.tier ? formatBaekjoonTier(post.tier) : '';
  const tierRank = getTierRank(tierWithSublevel);
  const tierColor = getTierColor(tierRank);

  // 날짜 포맷팅
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

    if (diffInHours < 1) {
      return '방금 전';
    } else if (diffInHours < 24) {
      return `${diffInHours}시간 전`;
    } else if (diffInHours < 24 * 7) {
      return `${Math.floor(diffInHours / 24)}일 전`;
    } else {
      return date.toLocaleDateString('ko-KR', {
        month: 'short',
        day: 'numeric',
      });
    }
  };

  return (
    <div
      onClick={onClick}
      className="bg-surface p-4 border-b border-border cursor-pointer hover:bg-gray-50 transition-colors"
    >
      {/* 문제 정보 (있는 경우) */}
      {post.problemNumber && (
        <div className="flex items-center gap-2 mb-2">
          <div
            className="text-white text-xs px-2 py-1 rounded-md font-bold"
            style={{ backgroundColor: tierColor }}
          >
            {tierWithSublevel}
          </div>
          <span className="text-sm text-text-secondary">
            #{post.problemNumber}번 {post.problemTitle}
          </span>
          {post.algorithm && (
            <span className="text-xs bg-gray-100 px-2 py-1 rounded-md text-text-secondary">
              {post.algorithm}
            </span>
          )}
        </div>
      )}

      {/* 제목 */}
      <h3 className="text-base font-semibold text-text-primary mb-2 line-clamp-2">{post.title}</h3>

      {/* 내용 미리보기 */}
      <p className="text-sm text-text-secondary mb-3 line-clamp-2">{post.content}</p>

      {/* 하단 정보 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img
            src={post.authorProfileImg}
            alt={post.authorNickname}
            className="w-6 h-6 rounded-full bg-gray-200"
          />
          <span className="text-xs text-text-secondary">{post.authorNickname}</span>
          <span className="text-xs text-text-secondary">·</span>
          <span className="text-xs text-text-secondary">{formatDate(post.createdAt)}</span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <span className={`text-xs ${post.isLiked ? 'text-red-500' : 'text-text-secondary'}`}>
              {post.isLiked ? '❤️' : '🤍'}
            </span>
            <span className="text-xs text-text-secondary">{post.likeCount}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-xs text-text-secondary">💬</span>
            <span className="text-xs text-text-secondary">{post.commentCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostItem;
