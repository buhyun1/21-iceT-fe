import { useNavigate } from 'react-router-dom';

interface IProblemItemProps {
  problemNumber: number;
  title: string;
  tier: string;
  isAnswered: boolean;
  problemSetId: number;
}

const ProblemItem = ({
  problemNumber,
  title,
  tier,
  isAnswered,
  problemSetId,
}: IProblemItemProps) => {
  const navigate = useNavigate();

  // 티어에서 백준 랭크명 추출
  const getTierRank = (tier: string): string => {
    if (!tier) return 'unrated';
    const [rank] = tier.split(' ');

    return rank?.toLowerCase() || 'unrated';
  };

  const tierRank = getTierRank(tier);
  const tierClassName = `bg-tier-${tierRank}`;

  const handleClick = () => {
    if (isAnswered) {
      navigate(`/problems/${problemNumber}`);
    } else {
      navigate('/survey', { state: { problemSetId: problemSetId } });
    }
  };

  return (
    <div
      onClick={handleClick}
      className="flex items-center justify-between cursor-pointer p-4 hover:bg-gray-100 rounded-md"
    >
      <div className="flex items-center gap-2">
        <div className={`${tierClassName} text-white text-xs px-2 py-1 rounded-md font-bold`}>
          {tier}
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
