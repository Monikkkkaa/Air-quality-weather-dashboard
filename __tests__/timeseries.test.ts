import { expect, test, describe } from 'vitest';
import { hourlyWindow } from '../lib/timeseries';

describe('timeseries logic', () => {
  test('returns empty array if no data', () => {
    expect(hourlyWindow(null, 'pm2_5')).toEqual([]);
    expect(hourlyWindow({ time: [] }, 'pm2_5')).toEqual([]);
  });

  test('finds correct window based on current time', () => {
    const hourly = {
      time: [
        '2024-01-01T00:00:00Z',
        '2024-01-01T01:00:00Z',
        '2024-01-01T02:00:00Z',
        '2024-01-01T03:00:00Z',
        '2024-01-01T04:00:00Z',
      ],
      temp: [10, 11, 12, 13, 14],
    };

    const result = hourlyWindow(hourly, 'temp', { 
      hours: 2, 
      nowIso: '2024-01-01T01:30:00Z' 
    });

    // Closest to 01:30 is 01:00 or 02:00, index 1 or 2
    expect(result.length).toBe(2);
    expect(result[0].value).toBe(11);
    expect(result[1].value).toBe(12);
  });
});
