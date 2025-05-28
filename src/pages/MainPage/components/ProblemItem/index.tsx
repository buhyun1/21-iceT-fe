import { formatBaekjoonTier } from '@/features/problemSet/utils/convertTier';

interface IProblemItemProps {
  problemNumber: number;
  title: string;
  tier: string;
}

const ProblemItem = ({ problemNumber, title, tier }: IProblemItemProps) => {
  const getTierRank = (tier: string): string => {
    const [rank] = tier.split(' ');

    return rank || 'unrated';
  };

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
        return '#777777';
    }
  };

  const tierWithSublevel = formatBaekjoonTier(tier);
  const tierRank = getTierRank(tierWithSublevel);
  const tierColor = getTierColor(tierRank);

  const handleClick = () => {
    const url = `https://www.acmicpc.net/problem/${problemNumber}`;
    window.open(url, '_blank');
  };

  return (
    <div
      onClick={handleClick}
      className="flex items-center justify-between cursor-pointer p-4 hover:bg-gray-100 rounded-md transition-colors"
    >
      <div className="flex items-center gap-2">
        <div
          className="text-white text-xs px-2 py-1 rounded-md font-bold"
          style={{ backgroundColor: tierColor }}
        >
          {tierWithSublevel}
        </div>
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
