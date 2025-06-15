import Button from '@/shared/ui/Button';
import Card from '@/shared/ui/Card';
import defaultProfileImage from '@/assets/defaultProfileImage.png';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@/shared/ui/EditIcon';

interface IProfileCardProps {
  profileImgUrl: string;
  nickname: string;
  statusMessage: string;
}

const ProfileCard = ({ profileImgUrl, nickname, statusMessage }: IProfileCardProps) => {
  const navigate = useNavigate();
  const todayDate = new Date().toISOString().split('T')[0];

  const handleNavigateToEditPage = () => {
    navigate('/complete-profile', { state: { isEditMode: true } });
  };

  return (
    <Card className="p-4">
      <div className="flex flex-col gap-2">
        <div className="flex gap-8 items-start p-2">
          <img
            src={profileImgUrl ? profileImgUrl : defaultProfileImage}
            alt=""
            className="w-20 h-20 rounded-full object-cover bg-[#EFEFEF]"
          />
          <div className="flex flex-col justify-center gap-2 flex-1 p-4">
            <p className="text-bold-14">{nickname}</p>
            <p className="text-text-secondary text-regular-14">{statusMessage}</p>
          </div>
          <EditIcon
            onClick={handleNavigateToEditPage}
            className="w-5 h-5 text-gray-400 hover:text-gray-600 cursor-pointer transition-colors mt-1"
          />
        </div>
        <Button
          className="bg-secondary hover:bg-secondary-hover w-full"
          onClick={() => navigate('/survey', { state: { date: todayDate } })}
        >
          오늘의 학습 설문하고 해설보기
        </Button>
        <div className="w-full border-2 border-border border-t my-3" />
      </div>
    </Card>
  );
};

export default ProfileCard;
