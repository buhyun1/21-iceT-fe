import { formatDate } from '@/utils/formatDate';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

type Author = {
  userId: number;
  imgUrl: string;
  nickname: string;
};

interface ICommentProps {
  content: string;
  createdAt: string;
  author: Author;
}

const CommentItem = (data: ICommentProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const queryClient = useQueryClient();
  const currentUserData = queryClient.getQueryData(['user']);
  console.log(currentUserData);

  const isOwner = data.author.userId;

  const handleToggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  return (
    <div className="py-4 border-b border-border last:border-b-0">
      <div className="flex gap-3">
        {/* 프로필 이미지 */}
        <img
          src={data.author.imgUrl}
          alt={data.author.nickname}
          className="w-8 h-8 rounded-full object-cover flex-shrink-0"
        />

        <div className="flex-1 min-w-0">
          {/* 상단: 작성자 정보 */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-text-primary text-sm">
                {data.author.nickname}
              </span>
              <span className="text-text-secondary text-xs">{formatDate(data.createdAt)}</span>
            </div>

            {/* 메뉴 버튼 */}
            <div className="relative">
              <button
                onClick={handleToggleMenu}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors text-text-secondary hover:text-text-primary"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="1" />
                  <circle cx="19" cy="12" r="1" />
                  <circle cx="5" cy="12" r="1" />
                </svg>
              </button>

              {/* 드롭다운 메뉴 */}
              {isMenuOpen && (
                <>
                  {/* 백드롭 */}
                  <div className="fixed inset-0 z-10" onClick={() => setIsMenuOpen(false)} />

                  {/* 메뉴 */}
                  <div className="absolute right-0 top-8 z-20 bg-white border border-border rounded-lg shadow-lg py-1 min-w-[100px]">
                    {isOwner && (
                      // 본인 댓글 메뉴
                      <>
                        <button
                          //onClick={handleEdit}
                          className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 transition-colors text-text-primary"
                        >
                          수정
                        </button>
                        <button
                          //onClick={handleDelete}
                          className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 transition-colors text-error"
                        >
                          삭제
                        </button>
                      </>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* 댓글 내용 */}
          <p className="text-text-primary text-sm leading-relaxed mb-3">{data.content}</p>
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
