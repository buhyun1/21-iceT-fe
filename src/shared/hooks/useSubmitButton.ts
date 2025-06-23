interface ISubmitButtonProps {
  submitErr: string | null;
  isLoading: boolean;
  submitText?: string;
  loadingText?: string;
}

const useSubmitButton = ({
  submitErr,
  isLoading,
  submitText = '제출하기',
  loadingText = '제출 중...',
}: ISubmitButtonProps) => {
  const isDisabled = !!submitErr || isLoading;
  const buttonText = isLoading ? loadingText : submitText;

  return { isDisabled, buttonText };
};

export default useSubmitButton;
