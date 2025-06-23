import { useState, useEffect } from 'react';
import hotIc from '@/assets/hotIc.png';
import { useNavigate } from 'react-router-dom';
import { Post } from '../types/post';

interface IHotPostItemProps {
  hotPostData: Post[];
}

const HotPostItem = ({ hotPostData }: IHotPostItemProps) => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (hotPostData.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex === hotPostData.length - 1 ? 0 : prevIndex + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, [hotPostData.length]);

  if (!hotPostData || hotPostData.length === 0) return null;

  const currentPost = hotPostData[currentIndex];

  const onClickPostItem = () => {
    navigate(`/post/${currentPost.postId}`);
  };

  return (
    <div
      onClick={onClickPostItem}
      className="flex items-center gap-3 mx-4 my-3 p-4 bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-lg cursor-pointer hover:shadow-md hover:scale-[1.02] transition-all duration-200"
    >
      {/* 핫 아이콘 */}
      <div className="flex-shrink-0">
        <img src={hotIc} alt="hot" width={32} height={32} className="animate-pulse" />
      </div>

      {/* 텍스트 영역 */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="inline-flex items-center px-2 py-1 text-xs font-bold text-red-600 bg-red-100 rounded-full">
            HOT
          </span>
          <p className="text-sm font-medium text-red-700">이번주의 인기 게시물</p>
        </div>
        <p className="text-base font-semibold text-gray-800 truncate animate-fade-in-out">
          {currentPost.title}
        </p>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-xs text-gray-500">❤️ {currentPost.likeCount}</span>
          <span className="text-xs text-gray-500">💬 {currentPost.commentCount}</span>
          <span className="text-xs text-gray-500">#{currentPost.problemNumber}번</span>
        </div>
      </div>

      {/* 화살표 아이콘 */}
      <div className="flex-shrink-0">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-gray-400">
          <path
            d="M9 18L15 12L9 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
};

export default HotPostItem;
