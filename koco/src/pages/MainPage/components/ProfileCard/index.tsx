import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { useNavigate } from 'react-router-dom';

interface IProfileCardProps {
  profileImgUrl: string;
  nickname: string;
  statusMessage: string;
  problemSetId: number;
}

const ProfileCard = ({
  profileImgUrl,
  nickname,
  statusMessage,
  problemSetId,
}: IProfileCardProps) => {
  const navigate = useNavigate();
  const todayDate = new Date().toISOString().split('T')[0];

  return (
    <Card className="p-4">
      <div className="flex flex-col gap-2">
        <div className="flex gap-8 p-2">
          <img
            src={profileImgUrl}
            alt=""
            className="w-20 h-20 rounded-full object-cover bg-[#EFEFEF]"
          />
          <div className="flex flex-col justify-center gap-2">
            <p className="text-bold-14">{nickname}</p>
            <p className=" text-text-secondary text-regular-14">{statusMessage}</p>
          </div>
        </div>
        <Button
          className="bg-secondary hover:bg-secondary-hover w-full"
          onClick={() =>
            navigate('/survey', { state: { problemSetId: problemSetId, date: todayDate } })
          }
        >
          오늘의 학습 설문하고 해설보기
        </Button>
        <div className="w-full border-2 border-border border-t my-3" />
      </div>
    </Card>
  );
};

export default ProfileCard;
