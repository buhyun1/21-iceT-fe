import backArrowIc from '@/assets/backArrowIc.svg';
import { useNavigate } from 'react-router-dom';

interface IPageHeaderProps {
  title: string;
}

const PageHeader = ({ title }: IPageHeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex gap-6 mb-10  px-4 py-6">
      <img src={backArrowIc} onClick={() => navigate(-1)} />
      <h1 className="text-xl mb-4">{title}</h1>
    </div>
  );
};

export default PageHeader;
