import KocoImage from '@/assets/kocoImage.png';
import useGetAlarmCount from '@/features/alarm/hooks/useGetAlarmCount';
import { useNavigate } from 'react-router-dom';

interface IHeaderProps {
  receiverId?: number;
  hasNotification?: boolean;
}

const Header = ({ receiverId }: IHeaderProps) => {
  const navigate = useNavigate();
  const { data: alarmCountData } = useGetAlarmCount(receiverId || 0);
  const handleNotificationClick = () => {
    navigate('/alarms', { state: { receiverId } });
  };

  return (
    <header className="relative text-center h-16 flex items-center justify-center px-6 py-8 bg-[#FFEFC3] ">
      <div className="flex items-center gap-3 relative z-10">
        <img
          src={KocoImage}
          width={40}
          height={50}
          alt="KOCO 로고"
          className="hover:scale-105 transition-transform duration-300"
        />
        <h1 className="text-3xl font-jua text-[#4D290A] drop-shadow-md">코코</h1>
      </div>

      <button
        onClick={handleNotificationClick}
        className="absolute right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-gray-600">
          <path
            d="M12 2C11.45 2 11 2.45 11 3C8.24 3.45 6 5.94 6 9V14L4 16V17H20V16L18 14V9C18 5.94 15.76 3.45 13 3C13 2.45 12.55 2 12 2ZM12 22C13.1 22 14 21.1 14 20H10C10 21.1 10.9 22 12 22Z"
            fill="currentColor"
          />
        </svg>

        {alarmCountData?.unreadCount !== 0 && Number(alarmCountData?.unreadCount) > 0 && (
          <div className="absolute top-1 right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white animate-pulse" />
        )}
      </button>
    </header>
  );
};

export default Header;
