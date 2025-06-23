import { useRef, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import DEFAULT_IMG from '@/assets/defaultProfileImage.png';
import useInput from '@/shared/hooks/useInput';
import useFileInput from '@/shared/hooks/useFileInput';
import Button from '@/shared/ui/Button';
import { useCompleteProfile } from '@/features/user/hooks/useCompleteProfile';
import { useUploadS3 } from '@/features/user/hooks/useUploadS3';
import { getPresignedUrl } from '@/features/user/api/getPresignedUrl';
import useSubmitButton from '@/shared/hooks/useSubmitButton';
import PageHeader from '@/shared/layout/PageHeader';

export default function FirstLoginPage() {
  const fileRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { isEditMode } = location.state || false;
  const { value: nickname, onChange: onChangeNickname } = useInput();
  const { value: statusMsg, onChange: onChangeStatusMessage } = useInput();
  const { preview, onChange: onChangeFile } = useFileInput();
  const completeProfileMutation = useCompleteProfile();
  const s3UploadMutation = useUploadS3();

  /** 제출 전 검사 */
  const nicknameErr = useMemo(() => {
    if (!nickname) return '닉네임을 입력해주세요.';
    if (/\s/.test(nickname)) return '띄어쓰기를 없애주세요.';
    if (nickname.length < 2 || nickname.length > 15)
      return '닉네임은 최소 2자, 최대 15글자까지 작성 가능합니다.';

    return null;
  }, [nickname]);

  const statusErr = statusMsg.length > 50 ? '상태메세지는 최대 50자까지 작성 가능합니다.' : null;
  const submitErr = nicknameErr || statusErr;
  const [isLoading, setIsLoading] = useState(false);
  const { isDisabled, buttonText } = useSubmitButton({ submitErr, isLoading });

  /* 제출 */
  const handleSubmit = async () => {
    if (submitErr) return;

    const file = fileRef.current?.files?.[0];

    try {
      setIsLoading(true);

      // S3 업로드 로직
      let profileImgUrl = '';

      if (file) {
        // 파일이 있는 경우에만 S3 업로드 후 프로필 완성 API 호출

        const presignedData = await getPresignedUrl(file.name);

        if (presignedData) {
          try {
            await s3UploadMutation.mutateAsync({
              presignedUrl: presignedData.presignedUrl,
              file: file,
            });

            // 업로드 성공 시 URL 저장
            profileImgUrl = presignedData.fileUrl;
          } catch (error) {
            console.error('S3 업로드 실패:', error);
            alert('이미지 업로드에 실패했습니다.');

            return;
          }
        }
      }

      // 파일이 없는 경우 바로 프로필 완성 API 호출
      const profileData = {
        profileImgUrl: profileImgUrl,
        nickname: nickname,
        statusMsg: statusMsg || '',
      };

      await completeProfileMutation.mutateAsync(profileData);
      navigate('/home');
    } catch {
      alert('프로필 등록에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-background min-h-screen relative">
      {isEditMode === true && <PageHeader title="프로필 수정" />}
      {/* 프로필 이미지 */}
      <div className="flex flex-col items-center justify-center px-4 py-10">
        <div className="relative">
          <img
            src={preview || DEFAULT_IMG}
            alt="profile"
            className="w-40 h-40 rounded-full object-cover bg-[#EFEFEF]"
          />
          <button
            onClick={() => fileRef.current?.click()}
            className="absolute right-0 bottom-0 w-8 h-8 flex items-center justify-center
                     rounded-full bg-black text-white"
          >
            ✎
          </button>
          <input
            ref={fileRef}
            type="file"
            accept=".jpg,.jpeg,.png,.gif"
            onChange={onChangeFile}
            className="hidden"
          />
        </div>

        {/* 닉네임 */}
        <label className="mt-6 mb-4 w-full max-w-md text-bold-14">닉네임</label>
        <input
          value={nickname}
          onChange={onChangeNickname}
          placeholder="닉네임을 입력해주세요"
          className="bg-input w-full max-w-md rounded-lg  py-3 px-4 outline-none text-sm"
        />

        <p className="text-text-error text-xs w-full max-w-md py-3 px-4 h-8">
          {nicknameErr && nicknameErr}
        </p>

        {/* 상태메시지 */}
        <label className="mt-4 mb-4 w-full max-w-md text-bold-14">상태 메시지 (선택)</label>
        <input
          value={statusMsg}
          onChange={onChangeStatusMessage}
          placeholder="상태메세지를 작성해주세요"
          className="bg-input w-full max-w-md rounded-lg py-3 px-4 outline-none text-sm "
        />

        <p className="text-text-error text-xs w-full max-w-md py-3 px-4 h-8">
          {statusErr && statusErr}
        </p>

        {/* 가입 버튼 */}
        <Button
          disabled={isDisabled}
          onClick={handleSubmit}
          className={`mt-14 w-40 py-3 rounded-md text-white text-sm`}
        >
          {buttonText}
        </Button>
      </div>
    </div>
  );
}
