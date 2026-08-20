import { expect, test, describe } from 'vitest';
import { bandFor, weatherFor } from '../lib/constants';

describe('constants logic', () => {
  test('bandFor returns correct band based on AQI', () => {
    expect(bandFor(25).label).toBe('Good');
    expect(bandFor(75).label).toBe('Moderate');
    expect(bandFor(125).label).toBe('Unhealthy for Sensitive Groups');
    expect(bandFor(175).label).toBe('Unhealthy');
    expect(bandFor(400).label).toBe('Hazardous');
    
    // Null check
    expect(bandFor(null).label).toBe('Good');
  });

  test('weatherFor returns correct weather info based on WMO code', () => {
    expect(weatherFor(0).text).toBe('Clear sky');
    expect(weatherFor(61).icon).toBe('rain');
    
    // Unknown code check
    expect(weatherFor(999).text).toBe('Unknown');
  });
});
