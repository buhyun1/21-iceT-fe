import Card from '@/shared/ui/Card';
import ChunsikImage from '@/assets/chunsikImage.png';

interface IChunsikCardProps {
  onClick: () => void;
}

const ChunsikCard = ({ onClick }: IChunsikCardProps) => (
  <Card
    onClick={onClick}
    className="relative !bg-primary flex items-center text-white p-4 justify-between cursor-pointer overflow-hidden group transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
  >
    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-[length:200%_100%] opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-gradient-x" />
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />

    <div className="relative z-10">
      <p className="text-bold-14" style={{ fontFamily: 'Jua', fontWeight: 500 }}>
        춘식이 키우기
      </p>
      <p className="text-regular-14">리프레쉬가 필요하다면 잠시 쉬어가도 좋아요</p>
    </div>
    <div className="flex flex-shrink-0 relative z-10">
      <img src={ChunsikImage} width={65} className="group-hover:animate-bounce" />
    </div>
  </Card>
);

export default ChunsikCard;
