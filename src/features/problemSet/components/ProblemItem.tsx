import { formatBaekjoonTier } from '@/features/problemSet/utils/convertTier';

interface IProblemItemProps {
  problemNumber: number;
  title: string;
  tier: string;
  onClick: () => void;
}

const ProblemItem = ({ problemNumber, title, tier, onClick }: IProblemItemProps) => {
  // 티어에서 백준 랭크명 추출
  const getTierRank = (tier: string): string => {
    if (!tier) return 'unrated';
    const [rank] = tier.split(' ');

    return rank || 'unrated';
  };
  const tierWithSublevel = formatBaekjoonTier(tier);
  const tierRank = getTierRank(tierWithSublevel);

  // 티어 색상 가져오기 함수
  const getTierColor = (rank: string): string => {
    switch (rank) {
      case 'Bronze':
        return '#AD5600';
      case 'Silver':
        return '#435F7A';
      case 'Gold':
        return '#EC9A00';
      case 'Platinum':
        return '#27E2A4';
      case 'Diamond':
        return '#00B4FC';
      case 'Ruby':
        return '#FF0062';
      case 'Master':
        return '#9D0191';
      default:
        return '#777777'; // unrated
    }
  };

  const tierColor = getTierColor(tierRank);

  return (
    <div
      onClick={onClick}
      className="flex items-center justify-between cursor-pointer p-4 hover:bg-gray-100 rounded-md"
    >
      <div className="flex items-center gap-2">
        <div
          className="text-white text-xs px-2 py-1 rounded-md font-bold"
          style={{ backgroundColor: tierColor }}
        >
          {tierWithSublevel}
        </div>
        {/* <div className={`${tierClassName} text-white text-xs px-2 py-1 rounded-md font-bold`}>
          {tier}
        </div> */}
        <div className="flex flex-col">
          <span className="font-bold text-sm">#{problemNumber}번</span>
          <span className="text-sm">{title}</span>
        </div>
      </div>
      <span className="text-gray-400 text-xl">{'>'}</span>
    </div>
  );
};

export default ProblemItem;
