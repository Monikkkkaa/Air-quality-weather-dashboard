import { expect, test, describe } from 'vitest';
import { periodFor } from '../lib/daypart';

describe('daypart logic', () => {
  test('returns dawn for 5 AM', () => {
    // 5 AM UTC
    expect(periodFor('2024-01-01T05:00:00')).toBe('dawn');
  });

  test('returns day for 12 PM', () => {
    // 12 PM UTC
    expect(periodFor('2024-01-01T12:00:00')).toBe('day');
  });

  test('returns dusk for 5:30 PM (17:30)', () => {
    expect(periodFor('2024-01-01T17:30:00')).toBe('dusk');
  });

  test('returns night for 11 PM', () => {
    expect(periodFor('2024-01-01T23:00:00')).toBe('night');
  });
});
