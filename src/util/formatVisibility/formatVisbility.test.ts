import formatVisibility from "./formatVisibility";

describe('formatVisibility', () => {
    it('formats visibility in imperial units correctly', () => {
      expect(formatVisibility(16093, 'imperial')).toBe('Unlimited'); // ~10 miles
      expect(formatVisibility(8046, 'imperial')).toBe('5.0 mi'); // 5 miles
      expect(formatVisibility(161, 'imperial')).toBe('0.1 mi'); // 0.1 mile
      expect(formatVisibility(50, 'imperial')).toBe('Very poor'); // Less than 0.1 mile
    });
  
    it('formats visibility in metric units correctly', () => {
      expect(formatVisibility(16000, 'metric')).toBe('Unlimited'); // 16 km
      expect(formatVisibility(8000, 'metric')).toBe('8.0 km'); // 8 kilometers
      expect(formatVisibility(100, 'metric')).toBe('Very poor'); // Exactly 0.1 km
      expect(formatVisibility(50, 'metric')).toBe('Very poor'); // Less than 0.1 kilometer
      expect(formatVisibility(500, 'metric')).toBe('0.5 km'); // 0.5 kilometers
    });
  
    it('handles edge cases correctly', () => {
      expect(formatVisibility(0, 'imperial')).toBe('Very poor'); // Visibility of 0
      expect(formatVisibility(0, 'metric')).toBe('Very poor'); // Visibility of 0
    });
  });