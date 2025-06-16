import { Alarm } from '../types/alarm';

/**
 * 알람 타입에 따라 한글+전치사로 변환하는 함수
 * @param type
 */
const getNotificationText = (type: string) => {
  switch (type) {
    case 'COMMENT':
      return '댓글을';
    case 'LIKE':
      return '좋아요를';
    default:
      return '공지';
  }
};

// 알람 메시지 생성 ex) "Helen님이 댓글을 남겼습니다" 형식
export const getAlarmMessage = (alarm: Alarm) => {
  return `${alarm.senderNickname}님이 ${alarm.postTitle} 게시글에 ${getNotificationText(alarm.alarmType)} 남겼습니다`;
};
