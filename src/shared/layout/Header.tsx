import KocoImage from '@/assets/kocoImage.png';
import { useNavigate } from 'react-router-dom';

interface IHeaderProps {
  hasNotification?: boolean;
}

const Header = ({ hasNotification }: IHeaderProps) => {
  const navigate = useNavigate();

  const handleNotificationClick = () => {
    navigate('/alarms');
  };

  return (
    <header className="text-center h-16 flex items-center justify-center px-4 relative">
      {/* 가운데 로고 영역 */}
      <div className="flex items-center gap-2">
        <img src={KocoImage} width={40} height={50} alt="KOCO 로고" />
        <div>
          <h1 className="text-3xl font-bold relative">
            {/* 메인 텍스트 */}
            <span className="bg-gradient-to-r from-[#FF993A] to-[#FF8000] bg-clip-text text-transparent relative z-10">
              KOCO
            </span>

            {/* 텍스트 효과 - 블러된 그림자 */}
            <span className="absolute inset-0 bg-gradient-to-r from-[#FF993A] to-[#FF8000] opacity-30 blur-sm z-0">
              KOCO
            </span>
          </h1>
          <span className="text-[10px] text-gray-500 -mt-1 block">코딩 교육 플랫폼</span>
        </div>
      </div>

      {/* 절대 위치로 오른쪽 끝에 고정된 알람 아이콘 */}
      <button
        onClick={handleNotificationClick}
        className="absolute right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
      >
        {/* 더 예쁜 벨 아이콘 - 옵션 1 */}
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-gray-600">
          <path
            d="M12 2C11.45 2 11 2.45 11 3C8.24 3.45 6 5.94 6 9V14L4 16V17H20V16L18 14V9C18 5.94 15.76 3.45 13 3C13 2.45 12.55 2 12 2ZM12 22C13.1 22 14 21.1 14 20H10C10 21.1 10.9 22 12 22Z"
            fill="currentColor"
          />
        </svg>

        {/* 알람이 있을 때 빨간 점 */}
        {hasNotification && (
          <div className="absolute top-1 right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white animate-pulse" />
        )}
      </button>
    </header>
  );
};

export default Header;
