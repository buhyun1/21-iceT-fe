/**
 * 알람 타입별 아이콘을 반환하는 함수
 */
export const getNotificationIcon = (type: string) => {
  switch (type) {
    case 'COMMENT':
      return '💬';
    case 'LIKE':
      return '❤️';
    default:
      return '📢';
  }
};
