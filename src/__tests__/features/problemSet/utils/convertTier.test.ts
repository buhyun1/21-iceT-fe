import { formatBaekjoonTier } from '@/features/problemSet/utils/convertTier';
import { describe, it, expect } from 'vitest';

describe('formatBaekjoonTier 함수', () => {
  describe('Unranked (0레벨)', () => {
    it('0을 Unrated로 변환한다', () => {
      expect(formatBaekjoonTier('0')).toBe('Unrated');
      expect(formatBaekjoonTier('0.0')).toBe('Unrated');
    });

    it('빈 문자열을 Unrated로 변환한다', () => {
      expect(formatBaekjoonTier('')).toBe('Unrated');
    });
  });

  describe('Bronze 티어 (1-5레벨)', () => {
    it('Bronze 5 (1레벨)를 올바르게 변환한다', () => {
      expect(formatBaekjoonTier('1')).toBe('Bronze 5');
      expect(formatBaekjoonTier('1.0')).toBe('Bronze 5');
    });

    it('Bronze 4 (2레벨)를 올바르게 변환한다', () => {
      expect(formatBaekjoonTier('2')).toBe('Bronze 4');
      expect(formatBaekjoonTier('2.0')).toBe('Bronze 4');
    });

    it('Bronze 3 (3레벨)를 올바르게 변환한다', () => {
      expect(formatBaekjoonTier('3')).toBe('Bronze 3');
      expect(formatBaekjoonTier('3.0')).toBe('Bronze 3');
    });

    it('Bronze 2 (4레벨)를 올바르게 변환한다', () => {
      expect(formatBaekjoonTier('4')).toBe('Bronze 2');
      expect(formatBaekjoonTier('4.0')).toBe('Bronze 2');
    });

    it('Bronze 1 (5레벨)를 올바르게 변환한다', () => {
      expect(formatBaekjoonTier('5')).toBe('Bronze 1');
      expect(formatBaekjoonTier('5.0')).toBe('Bronze 1');
    });
  });

  describe('Silver 티어 (6-10레벨)', () => {
    it('Silver 5 (6레벨)를 올바르게 변환한다', () => {
      expect(formatBaekjoonTier('6')).toBe('Silver 5');
      expect(formatBaekjoonTier('6.0')).toBe('Silver 5');
    });

    it('Silver 4 (7레벨)를 올바르게 변환한다', () => {
      expect(formatBaekjoonTier('7')).toBe('Silver 4');
      expect(formatBaekjoonTier('7.0')).toBe('Silver 4');
    });

    it('Silver 3 (8레벨)를 올바르게 변환한다', () => {
      expect(formatBaekjoonTier('8')).toBe('Silver 3');
      expect(formatBaekjoonTier('8.0')).toBe('Silver 3');
    });

    it('Silver 2 (9레벨)를 올바르게 변환한다', () => {
      expect(formatBaekjoonTier('9')).toBe('Silver 2');
      expect(formatBaekjoonTier('9.0')).toBe('Silver 2');
    });

    it('Silver 1 (10레벨)를 올바르게 변환한다', () => {
      expect(formatBaekjoonTier('10')).toBe('Silver 1');
      expect(formatBaekjoonTier('10.0')).toBe('Silver 1');
    });
  });

  describe('Gold 티어 (11-15레벨)', () => {
    it('Gold 5 (11레벨)를 올바르게 변환한다', () => {
      expect(formatBaekjoonTier('11')).toBe('Gold 5');
      expect(formatBaekjoonTier('11.0')).toBe('Gold 5');
    });

    it('Gold 4 (12레벨)를 올바르게 변환한다', () => {
      expect(formatBaekjoonTier('12')).toBe('Gold 4');
      expect(formatBaekjoonTier('12.0')).toBe('Gold 4');
    });

    it('Gold 3 (13레벨)를 올바르게 변환한다', () => {
      expect(formatBaekjoonTier('13')).toBe('Gold 3');
      expect(formatBaekjoonTier('13.0')).toBe('Gold 3');
    });

    it('Gold 2 (14레벨)를 올바르게 변환한다', () => {
      expect(formatBaekjoonTier('14')).toBe('Gold 2');
      expect(formatBaekjoonTier('14.0')).toBe('Gold 2');
    });

    it('Gold 1 (15레벨)를 올바르게 변환한다', () => {
      expect(formatBaekjoonTier('15')).toBe('Gold 1');
      expect(formatBaekjoonTier('15.0')).toBe('Gold 1');
    });
  });

  describe('Platinum 티어 (16-20레벨)', () => {
    it('Platinum 5 (16레벨)를 올바르게 변환한다', () => {
      expect(formatBaekjoonTier('16')).toBe('Platinum 5');
      expect(formatBaekjoonTier('16.0')).toBe('Platinum 5');
    });

    it('Platinum 4 (17레벨)를 올바르게 변환한다', () => {
      expect(formatBaekjoonTier('17')).toBe('Platinum 4');
      expect(formatBaekjoonTier('17.0')).toBe('Platinum 4');
    });

    it('Platinum 3 (18레벨)를 올바르게 변환한다', () => {
      expect(formatBaekjoonTier('18')).toBe('Platinum 3');
      expect(formatBaekjoonTier('18.0')).toBe('Platinum 3');
    });

    it('Platinum 2 (19레벨)를 올바르게 변환한다', () => {
      expect(formatBaekjoonTier('19')).toBe('Platinum 2');
      expect(formatBaekjoonTier('19.0')).toBe('Platinum 2');
    });

    it('Platinum 1 (20레벨)를 올바르게 변환한다', () => {
      expect(formatBaekjoonTier('20')).toBe('Platinum 1');
      expect(formatBaekjoonTier('20.0')).toBe('Platinum 1');
    });
  });

  describe('Diamond 티어 (21-25레벨)', () => {
    it('Diamond 5 (21레벨)를 올바르게 변환한다', () => {
      expect(formatBaekjoonTier('21')).toBe('Diamond 5');
      expect(formatBaekjoonTier('21.0')).toBe('Diamond 5');
    });

    it('Diamond 4 (22레벨)를 올바르게 변환한다', () => {
      expect(formatBaekjoonTier('22')).toBe('Diamond 4');
      expect(formatBaekjoonTier('22.0')).toBe('Diamond 4');
    });

    it('Diamond 3 (23레벨)를 올바르게 변환한다', () => {
      expect(formatBaekjoonTier('23')).toBe('Diamond 3');
      expect(formatBaekjoonTier('23.0')).toBe('Diamond 3');
    });

    it('Diamond 2 (24레벨)를 올바르게 변환한다', () => {
      expect(formatBaekjoonTier('24')).toBe('Diamond 2');
      expect(formatBaekjoonTier('24.0')).toBe('Diamond 2');
    });

    it('Diamond 1 (25레벨)를 올바르게 변환한다', () => {
      expect(formatBaekjoonTier('25')).toBe('Diamond 1');
      expect(formatBaekjoonTier('25.0')).toBe('Diamond 1');
    });
  });

  describe('Ruby 티어 (26-30레벨)', () => {
    it('Ruby 5 (26레벨)를 올바르게 변환한다', () => {
      expect(formatBaekjoonTier('26')).toBe('Ruby 5');
      expect(formatBaekjoonTier('26.0')).toBe('Ruby 5');
    });

    it('Ruby 4 (27레벨)를 올바르게 변환한다', () => {
      expect(formatBaekjoonTier('27')).toBe('Ruby 4');
      expect(formatBaekjoonTier('27.0')).toBe('Ruby 4');
    });

    it('Ruby 3 (28레벨)를 올바르게 변환한다', () => {
      expect(formatBaekjoonTier('28')).toBe('Ruby 3');
      expect(formatBaekjoonTier('28.0')).toBe('Ruby 3');
    });

    it('Ruby 2 (29레벨)를 올바르게 변환한다', () => {
      expect(formatBaekjoonTier('29')).toBe('Ruby 2');
      expect(formatBaekjoonTier('29.0')).toBe('Ruby 2');
    });

    it('Ruby 1 (30레벨)를 올바르게 변환한다', () => {
      expect(formatBaekjoonTier('30')).toBe('Ruby 1');
      expect(formatBaekjoonTier('30.0')).toBe('Ruby 1');
    });
  });

  describe('Master 티어 (31레벨 이상)', () => {
    it('Master 5 (31레벨)를 올바르게 변환한다', () => {
      expect(formatBaekjoonTier('31')).toBe('Master 5');
      expect(formatBaekjoonTier('31.0')).toBe('Master 5');
    });

    it('Master 4 (32레벨)를 올바르게 변환한다', () => {
      expect(formatBaekjoonTier('32')).toBe('Master 4');
      expect(formatBaekjoonTier('32.0')).toBe('Master 4');
    });

    it('Master 3 (33레벨)를 올바르게 변환한다', () => {
      expect(formatBaekjoonTier('33')).toBe('Master 3');
      expect(formatBaekjoonTier('33.0')).toBe('Master 3');
    });

    it('Master 2 (34레벨)를 올바르게 변환한다', () => {
      expect(formatBaekjoonTier('34')).toBe('Master 2');
      expect(formatBaekjoonTier('34.0')).toBe('Master 2');
    });

    it('Master 1 (35레벨)를 올바르게 변환한다', () => {
      expect(formatBaekjoonTier('35')).toBe('Master 1');
      expect(formatBaekjoonTier('35.0')).toBe('Master 1');
    });
  });

  it('null이나 undefined 같은 값도 처리한다', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect(formatBaekjoonTier(null as any)).toBe('Unrated');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect(formatBaekjoonTier(undefined as any)).toBe('Unrated');
  });
});
