import React, { useEffect, useState } from 'react';
import { useNotificationStore } from '@/stores/useAlarmStore';
import type { IToast } from '@/stores/useAlarmStore';

interface IToastItemProps {
  toast: IToast;
}

const ToastItem: React.FC<IToastItemProps> = ({ toast }) => {
  const removeToast = useNotificationStore(state => state.removeToast);
  const [isVisible, setIsVisible] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    // 마운트 시 애니메이션
    const timer = setTimeout(() => setIsVisible(true), 10);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsLeaving(true);
    setTimeout(() => {
      removeToast(toast.id);
    }, 300); // 애니메이션 시간과 맞춤
  };

  const getToastStyles = () => {
    const baseClasses = `
      relative flex items-start gap-3 p-4 min-w-[320px] max-w-[400px]
      bg-white border border-gray-200 rounded-lg shadow-lg
      pointer-events-auto cursor-pointer
      transform transition-all duration-300 ease-in-out
    `;

    if (isLeaving) {
      return `${baseClasses} translate-x-full opacity-0 scale-95`;
    }

    if (isVisible) {
      return `${baseClasses} translate-x-0 opacity-100 scale-100 hover:scale-[1.02]`;
    }

    return `${baseClasses} translate-x-full opacity-0 scale-95`;
  };

  return (
    <div className={getToastStyles()} onClick={handleClose}>
      {/* 아이콘 */}
      <div className="flex-shrink-0 text-xl mt-0.5">{toast.icon}</div>

      {/* 메시지 */}
      <div className="flex-1 min-w-0">
        <p className="text-sm text-gray-800 leading-relaxed">{toast.message}</p>
      </div>

      {/* 닫기 버튼 */}
      <button
        onClick={e => {
          e.stopPropagation();
          handleClose();
        }}
        className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path
            d="M18 6L6 18M6 6L18 18"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
};

export default ToastItem;
