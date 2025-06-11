import Card from '@/shared/ui/Card';
import ChunsikImage from '@/assets/chunsikImage.png';

interface IChunsikCardProps {
  onClick: () => void;
}

const ChunsikCard = ({ onClick }: IChunsikCardProps) => (
  <Card
    onClick={onClick}
    className="!bg-primary flex items-center  text-white p-4 justify-between cursor-pointer"
  >
    <div>
      <p className="text-bold-14">춘식이 키우기</p>
      <p className="text-regular-14">미니게임 바로 가기</p>
    </div>
    <div className="flex flex-shrink-0">
      <img src={ChunsikImage} width={65} />
    </div>
  </Card>
);

export default ChunsikCard;
