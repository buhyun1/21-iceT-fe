import { createPortal } from 'react-dom';
import { useEffect } from 'react';

interface IConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmButtonColor?: 'primary' | 'danger';
}

const ConfirmModal = ({
  isOpen,
  title,
  message,
  confirmText = '예',
  cancelText = '아니오',
  onConfirm,
  onCancel,
  confirmButtonColor = 'primary',
}: IConfirmModalProps) => {
  // ESC 키로 모달 닫기
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onCancel();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscKey);
      // 모달이 열릴 때 body 스크롤 방지
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  const confirmButtonClass =
    confirmButtonColor === 'danger'
      ? 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500'
      : 'bg-primary hover:bg-primary-hover text-white focus:ring-primary';

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* 백드롭 */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onCancel}
      />

      {/* 모달 컨텐츠 */}
      <div className="relative bg-white rounded-lg shadow-xl max-w-sm mx-4 w-full transform transition-all animate-in fade-in-0 zoom-in-95 duration-200">
        <div className="p-6">
          {/* 헤더 */}
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          </div>

          {/* 메시지 */}
          <div className="mb-6">
            <p className="text-sm text-gray-600 leading-relaxed">{message}</p>
          </div>

          {/* 버튼 - 취소 / 확인 */}
          <div className="flex gap-3">
            <button
              onClick={onCancel}
              className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
            >
              {cancelText}
            </button>
            <button
              onClick={onConfirm}
              className={`flex-1 px-4 py-2 text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors ${confirmButtonClass}`}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ConfirmModal;
