import { formatDate } from '@/utils/formatDate';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

describe('formatDate', () => {
  // 고정된 현재 시간 설정
  const mockNow = new Date('2024-06-15T12:00:00Z');

  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(mockNow);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('방금 전', () => {
    it('1분 미만인 경우 "방금 전"을 반환해야 한다', () => {
      const date = new Date(mockNow.getTime() - 30 * 1000); // 30초 전
      expect(formatDate(date.toISOString())).toBe('방금 전');
    });

    it('정확히 0초 차이인 경우 "방금 전"을 반환해야 한다', () => {
      expect(formatDate(mockNow.toISOString())).toBe('방금 전');
    });

    it('59초 전인 경우 "방금 전"을 반환해야 한다', () => {
      const date = new Date(mockNow.getTime() - 59 * 1000);
      expect(formatDate(date.toISOString())).toBe('방금 전');
    });
  });

  describe('분 단위', () => {
    it('1분 전인 경우 "1분 전"을 반환해야 한다', () => {
      const date = new Date(mockNow.getTime() - 1 * 60 * 1000);
      expect(formatDate(date.toISOString())).toBe('1분 전');
    });

    it('30분 전인 경우 "30분 전"을 반환해야 한다', () => {
      const date = new Date(mockNow.getTime() - 30 * 60 * 1000);
      expect(formatDate(date.toISOString())).toBe('30분 전');
    });

    it('59분 전인 경우 "59분 전"을 반환해야 한다', () => {
      const date = new Date(mockNow.getTime() - 59 * 60 * 1000);
      expect(formatDate(date.toISOString())).toBe('59분 전');
    });
  });

  describe('시간 단위', () => {
    it('1시간 전인 경우 "1시간 전"을 반환해야 한다', () => {
      const date = new Date(mockNow.getTime() - 1 * 60 * 60 * 1000);
      expect(formatDate(date.toISOString())).toBe('1시간 전');
    });

    it('12시간 전인 경우 "12시간 전"을 반환해야 한다', () => {
      const date = new Date(mockNow.getTime() - 12 * 60 * 60 * 1000);
      expect(formatDate(date.toISOString())).toBe('12시간 전');
    });

    it('23시간 전인 경우 "23시간 전"을 반환해야 한다', () => {
      const date = new Date(mockNow.getTime() - 23 * 60 * 60 * 1000);
      expect(formatDate(date.toISOString())).toBe('23시간 전');
    });
  });

  describe('일 단위', () => {
    it('1일 전인 경우 "1일 전"을 반환해야 한다', () => {
      const date = new Date(mockNow.getTime() - 1 * 24 * 60 * 60 * 1000);
      expect(formatDate(date.toISOString())).toBe('1일 전');
    });

    it('3일 전인 경우 "3일 전"을 반환해야 한다', () => {
      const date = new Date(mockNow.getTime() - 3 * 24 * 60 * 60 * 1000);
      expect(formatDate(date.toISOString())).toBe('3일 전');
    });

    it('6일 전인 경우 "6일 전"을 반환해야 한다', () => {
      const date = new Date(mockNow.getTime() - 6 * 24 * 60 * 60 * 1000);
      expect(formatDate(date.toISOString())).toBe('6일 전');
    });
  });

  describe('월일 형식', () => {
    it('7일 전인 경우 "6월 8일" 형식을 반환해야 한다', () => {
      const date = new Date(mockNow.getTime() - 7 * 24 * 60 * 60 * 1000);
      expect(formatDate(date.toISOString())).toBe('6월 8일');
    });

    it('1개월 전인 경우 "5월 15일" 형식을 반환해야 한다', () => {
      const date = new Date('2024-05-15T12:00:00Z');
      expect(formatDate(date.toISOString())).toBe('5월 15일');
    });

    it('1년 전인 경우도 올바른 월일 형식을 반환해야 한다', () => {
      const date = new Date('2023-03-10T12:00:00Z');
      expect(formatDate(date.toISOString())).toBe('3월 10일');
    });
  });

  describe('경계값 테스트', () => {
    it('정확히 1분(60초) 전인 경우 "1분 전"을 반환해야 한다', () => {
      const date = new Date(mockNow.getTime() - 60 * 1000);
      expect(formatDate(date.toISOString())).toBe('1분 전');
    });

    it('정확히 1시간(3600초) 전인 경우 "1시간 전"을 반환해야 한다', () => {
      const date = new Date(mockNow.getTime() - 60 * 60 * 1000);
      expect(formatDate(date.toISOString())).toBe('1시간 전');
    });

    it('정확히 1일(86400초) 전인 경우 "1일 전"을 반환해야 한다', () => {
      const date = new Date(mockNow.getTime() - 24 * 60 * 60 * 1000);
      expect(formatDate(date.toISOString())).toBe('1일 전');
    });

    it('정확히 7일 전인 경우 월일 형식을 반환해야 한다', () => {
      const date = new Date(mockNow.getTime() - 7 * 24 * 60 * 60 * 1000);
      expect(formatDate(date.toISOString())).toBe('6월 8일');
    });
  });

  describe('다양한 날짜 형식 지원', () => {
    it('ISO 8601 형식을 지원해야 한다', () => {
      const date = new Date(mockNow.getTime() - 5 * 60 * 1000);
      expect(formatDate(date.toISOString())).toBe('5분 전');
    });

    it('일반적인 날짜 문자열 형식을 지원해야 한다', () => {
      const date = new Date(mockNow.getTime() - 2 * 60 * 60 * 1000);
      expect(formatDate(date.toString())).toBe('2시간 전');
    });
  });
});
