// src/shared/ui/FloatingButton/index.tsx
import { useNavigate } from 'react-router-dom';

interface IFloatingButtonProps {
  to: string;
  className?: string;
}

const FloatingButton = ({ to, className = '' }: IFloatingButtonProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(to);
  };

  return (
    <button
      onClick={handleClick}
      className={`
        absolute bottom-24 right-6 
        w-14 h-14 
        bg-black 
        rounded-full 
        flex items-center justify-center 
        shadow-lg hover:shadow-xl 
        hover:scale-110 
        active:scale-95
        transition-all duration-200 
        z-50
        ${className}
      `}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-white">
        <path
          d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="m18.5 2.5 a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>
    </button>
  );
};

export default FloatingButton;
