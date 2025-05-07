interface ISpinnerProps {
  text: string;
}

const Spinner = ({ text }: ISpinnerProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="text-xl mb-4">{text}</div>
      <div className="animate-spin rounded-full h-10 w-10 border-b-6 border-primary" />
    </div>
  );
};

export default Spinner;
