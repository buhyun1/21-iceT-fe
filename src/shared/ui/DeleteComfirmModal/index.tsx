import { createPortal } from 'react-dom';
import { useEffect, useState } from 'react';
import warningIc from '@/assets/warningIc.png';

interface IDeleteConfirmModalProps {
  isOpen: boolean;
  title: string;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const DeleteConfirmModal = ({
  isOpen,
  title,
  onConfirm,
  onCancel,
  isLoading = false,
}: IDeleteConfirmModalProps) => {
  const [inputValue, setInputValue] = useState('');
  const requiredText = '네 탈퇴하겠습니다.';
  const isValid = inputValue === requiredText;

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

  // 모달이 열릴 때마다 입력값 초기화
  useEffect(() => {
    if (isOpen) {
      setInputValue('');
    }
  }, [isOpen]);

  const handleConfirm = () => {
    if (isValid && !isLoading) {
      onConfirm();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  // Enter 키로 확인
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleConfirm();
    }
  };

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* 백드롭 */}
      <div className="absolute inset-0 bg-black/60 transition-opacity" onClick={onCancel} />

      {/* 모달 컨텐츠 */}
      <div className="relative bg-white rounded-lg shadow-xl max-w-sm mx-4 w-full transform transition-all animate-in fade-in-0 zoom-in-95 duration-200">
        <div className="p-6">
          {/* 닫기 버튼 */}
          <button
            onClick={onCancel}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* 헤더 */}
          <div className="mb-4 pr-8 flex justify-center">
            <img src={warningIc} className="mr-2" />
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          </div>

          {/* 메시지 */}
          <div className="mb-4 bg-bg-surface">
            <p className="text-sm text-gray-800 font-medium mb-2">
              정말 탈퇴하려면 다음 문구를 정확히 입력해주세요:
            </p>
            <p className="text-sm font-semibold text-error">{requiredText}</p>
          </div>

          {/* 입력 필드 */}
          <div className="mb-6">
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder="위 문구를 정확히 입력해주세요"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              disabled={isLoading}
            />
            {/* 입력값 검증 피드백 */}
            {inputValue && !isValid && (
              <p className="text-xs text-error mt-1">입력한 문구가 정확하지 않습니다.</p>
            )}
          </div>

          {/* 버튼들 */}
          <div className="flex gap-3">
            <button
              onClick={onCancel}
              disabled={isLoading}
              className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors disabled:opacity-50"
            >
              취소하기
            </button>
            <button
              onClick={handleConfirm}
              disabled={!isValid || isLoading}
              className={`flex-1 px-4 py-2 text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors ${
                isValid && !isLoading
                  ? 'bg-error hover:bg-error-hover text-white focus:ring-red-500'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {isLoading ? '탈퇴 처리 중...' : '탈퇴하기'}
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default DeleteConfirmModal;
