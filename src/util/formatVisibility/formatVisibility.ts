function formatVisibility(
  visibility: number,
  units: 'imperial' | 'metric'
): string {
  // Convert visibility to miles or kilometers
  const visibilityInUnit =
    units === 'imperial' ? visibility / 1609 : visibility / 1000;
  const maxVisibility = units === 'imperial' ? 10 : 16; // 10 miles or 16 km
  const unit = units === 'imperial' ? 'mi' : 'km';

  if (visibilityInUnit >= maxVisibility) {
    return 'Unlimited';
  } else if (visibilityInUnit <= 0.1) {
    // Using less than or equal to
    return 'Very poor'; // Return a human-readable message for very low visibility
  } else {
    return `${visibilityInUnit.toFixed(1)} ${unit}`;
  }
}

export default formatVisibility;
