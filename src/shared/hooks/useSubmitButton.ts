interface ISubmitButtonProps {
  canSubmit: string | false;
  isLoading: boolean;
}

const useSubmitButton = ({ canSubmit, isLoading }: ISubmitButtonProps) => {
  const isDisabled = !canSubmit || isLoading;
  const buttonText = isLoading ? '처리중입니다...' : '가입하기';

  return { isDisabled, buttonText };
};

export default useSubmitButton;
