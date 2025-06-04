import HotPostItem from '@/features/post/components/HotPostItem';
import PostItem from '@/features/post/components/PostItem';
import useInput from '@/shared/hooks/useInput';
import BottomNav from '@/shared/layout/BottomNav';
import PageHeader from '@/shared/layout/PageHeader';
import FloatingButton from '@/shared/ui/FloatingButton';
import SearchInput from '@/shared/ui/SearchInput';
import { useState } from 'react';
import AlgorithmDropdown from './ui/AlgorithmDropdown';
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

const dummyPostList = [
  {
    postId: 1,
    title: '이 문제 어떻게 푸셨어요?',
    content: '아무리 생각해도 반례가 생각나지 않습니다',
    author: {
      userId: 1,
      nickname: '코코몽',
      imgUrl: 'https://koco.s3.ap-northeast-2.amazonaws.com/profile/12.jpg',
    },
    countLike: 6,
    countComment: 2,
    createdAt: '2025-04-08 10:00',
  },
  {
    postId: 2,
    title: '반례 부탁드립니다.',
    content: '아무리 생각해도 반례가 생각나지 않습니다',
    author: {
      userId: 1,
      nickname: '코코몽',
      imgUrl: 'https://koco.s3.ap-northeast-2.amazonaws.com/profile/12.jpg',
    },
    countLike: 1,
    countComment: 2,
    createdAt: '2025-04-08 12:00',
  },
];

const hotPost = {
  postId: 1,
  title: '이 문제 어떻게 푸셨어요?',
};

const PostsPage = () => {
  const { onChange, value: searchValue, reset: resetInputValue } = useInput();
  const [selectedAlgorithmTypes, setSelectedAlgorithmTypes] = useState<string[]>([]);

  // 검색 처리 & input 값 초기화
  const handleSearch = () => {
    console.log('검색한 값', searchValue);
    resetInputValue();
  };

  // 알고리즘 유형 모두 선택 해제
  const handleClearAllTypes = () => {
    setSelectedAlgorithmTypes([]);
  };

  // 알고리즘 유형 선택/해제
  const handleToggleAlgorithmType = (type: string) => {
    setSelectedAlgorithmTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  return (
    <div className="bg-background min-h-screen relative">
      <PageHeader title="커뮤니티" />
      <SearchInput
        className="mr-6 ml-6"
        value={searchValue}
        onChange={onChange}
        onSearch={handleSearch}
      />

      {/* 알고리즘 유형 드롭다운 */}
      <AlgorithmDropdown
        selectedTypes={selectedAlgorithmTypes}
        onToggleType={handleToggleAlgorithmType}
        onClearAll={handleClearAllTypes}
      />
      {/* 인기 게시글*/}
      <HotPostItem hotPost={hotPost} />
      {dummyPostList.length > 0 ? (
        dummyPostList.map(post => <PostItem key={post.postId} post={post} />)
      ) : (
        <p className="text-center">게시글이 없습니다.</p>
      )}
      <FloatingButton to="/new-post" tooltip="💭 나만의 풀이를 공유해보세요!" />
      <BottomNav />
    </div>
  );
};

export default PostsPage;
