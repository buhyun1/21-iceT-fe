import { useNavigate } from 'react-router-dom';

interface IProblemItemProps {
  problemNumber: number;
  title: string;
  tier: string;
  isAnswered: boolean;
  problemSetId: number;
  date: string;
}

const ProblemItem = ({
  problemNumber,
  title,
  tier,
  isAnswered,
  problemSetId,
  date,
}: IProblemItemProps) => {
  const navigate = useNavigate();

  // 티어에서 백준 랭크명 추출
  const getTierRank = (tier: string): string => {
    if (!tier) return 'unrated';
    const [rank] = tier.split(' ');

    return rank?.toLowerCase() || 'unrated';
  };

  const tierRank = getTierRank(tier);
  // const tierClassName = `bg-tier-${tierRank}`;
  // console.log(tierRank, tierClassName);

  // 티어 색상 가져오기 함수
  const getTierColor = (rank: string): string => {
    switch (rank) {
      case 'bronze':
        return '#AD5600';
      case 'silver':
        return '#435F7A';
      case 'gold':
        return '#EC9A00';
      case 'platinum':
        return '#27E2A4';
      case 'diamond':
        return '#00B4FC';
      case 'ruby':
        return '#FF0062';
      case 'master':
        return '#9D0191';
      default:
        return '#777777'; // unrated
    }
  };

  const tierColor = getTierColor(tierRank);

  console.log(isAnswered);

  const handleClick = () => {
    if (isAnswered) {
      navigate(`/problems/${problemNumber}`);
    } else {
      alert('설문이 기록되지 않았습니다. 설문페이지로 이동합니다');
      navigate('/survey', { state: { problemSetId: problemSetId, date: date } });
    }
  };

  return (
    <div
      onClick={handleClick}
      className="flex items-center justify-between cursor-pointer p-4 hover:bg-gray-100 rounded-md"
    >
      <div className="flex items-center gap-2">
        <div
          className="text-white text-xs px-2 py-1 rounded-md font-bold"
          style={{ backgroundColor: tierColor }}
        >
          {tier}
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
