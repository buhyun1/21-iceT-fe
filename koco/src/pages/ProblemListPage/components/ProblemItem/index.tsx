import { useNavigate } from 'react-router-dom';

interface IProblemItemProps {
  problemNumber: number;
  title: string;
  tier: string;
}

const ProblemItem = ({ problemNumber, title, tier }: IProblemItemProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/problems/${problemNumber}`);
  };

  return (
    <div
      onClick={handleClick}
      className="flex items-center justify-between cursor-pointer p-4 hover:bg-gray-100 rounded-md"
    >
      <div className="flex items-center gap-2">
        <div className="bg-[#A0522D] text-white text-xs px-2 py-1 rounded-md font-bold">{tier}</div>
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
