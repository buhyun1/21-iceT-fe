// src/shared/ui/FloatingButton/index.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface IFloatingButtonProps {
  to: string;
  className?: string;
  tooltip?: string;
}

const FloatingButton = ({ to, className = '', tooltip = '' }: IFloatingButtonProps) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    navigate(to);
  };

  return (
    <div
      className="fixed bottom-24 right-7 z-50"
      style={{ right: 'max(1.5rem, calc(50vw - 17.5rem))' }}
    >
      {/* 툴팁 말풍선 */}
      <div
        className={`
          absolute bottom-16 right-0 
          px-3 py-2 
          bg-gray-800 text-white text-sm 
          rounded-lg rounded-br-none
          whitespace-nowrap
          transition-all duration-200
          ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'}
        `}
      >
        {tooltip}
        {/* 말풍선 꼬리 */}
        <div className="absolute bottom-0 right-2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-gray-800 transform translate-y-full" />
      </div>

      {/* 플로팅 버튼 */}
      <button
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`
          w-14 h-14 
          bg-black 
          rounded-full 
          flex items-center justify-center 
          shadow-lg hover:shadow-xl 
          hover:scale-110 
          active:scale-95
          transition-all duration-200 
          text-white text-xl
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
    </div>
  );
};

export default FloatingButton;
