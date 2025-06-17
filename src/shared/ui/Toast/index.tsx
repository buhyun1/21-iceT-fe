import React from 'react';
import ToastItem from './ToastItem';
import { useNotificationStore } from '@/stores/useAlarmStore';

const ToastContainer: React.FC = () => {
  const toasts = useNotificationStore(state => state.toasts);

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 pointer-events-none">
      {toasts.map(toast => (
        <ToastItem key={toast.id} toast={toast} />
      ))}
    </div>
  );
};

export default ToastContainer;
