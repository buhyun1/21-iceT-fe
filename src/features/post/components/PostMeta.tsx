import { CategoryBox } from '@/shared/ui/CategoryBox';
import { formatDate } from '@/utils/formatDate';

type Author = {
  imgUrl: string;
  nickname: string;
};

type Category = {
  categoryName: string;
  categoryId: number;
};

interface IPostMetaProps {
  title: string;
  createdAt: string;
  categories: Category[];
  author: Author;
}

const PostMeta = (data: IPostMetaProps) => {
  return (
    <div className="border-b-[2px] border-border">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold text-text-primary mb-4">{data.title}</h2>
        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
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
      </div>

      <div className="flex items-center gap-3 mb-4">
        <img
          src={data.author.imgUrl}
          alt={data.author.nickname}
          className="w-8 h-8 rounded-full object-cover"
        />
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-text-primary">{data.author.nickname}</span>
            <span className="text-text-secondary text-sm">•</span>
            <span className="text-text-secondary text-sm">{formatDate(data.createdAt)}</span>
          </div>
        </div>
      </div>
      {/* 알고리즘 유형 */}
      {data.categories && data.categories.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {data.categories.map(category => (
            <CategoryBox key={category.categoryId} name={category.categoryName} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PostMeta;
