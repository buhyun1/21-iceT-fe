import Card from '@/components/ui/Card';
import ChunsikImage from '@/assets/chunsikImage.png';

const GameBannerCard = () => (
  <Card className="!bg-primary flex items-center  text-white p-4 justify-between">
    <div>
      <p className="text-bold-14">춘식이가 열심히 응원하고 있어요 </p>
      <p className="text-regular-14">열심히 코딩테스트를 풀면 춘식이가 좋아해요 🍠</p>
    </div>
    <div className="w-16 h-16 flex-shrink-0">
      <img src={ChunsikImage} />
    </div>
  </Card>
);

export default GameBannerCard;
