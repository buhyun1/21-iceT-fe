import Card from '@/components/ui/Card';
import ChunsikImage from '@/assets/chunsikImage.png';

const ChunsikCard = () => (
  <Card className="!bg-primary flex items-center  text-white p-4 justify-between">
    <div>
      <p className="text-bold-14">춘식이가 열심히 응원하고 있어요</p>
      <p className="text-regular-14">카테부 화이팅💞</p>
    </div>
    <div className="flex flex-shrink-0">
      <img src={ChunsikImage} width={65} />
    </div>
  </Card>
);

export default ChunsikCard;
