function formatVisibility(visibility: number, units: 'imperial' | 'metric'): string {
  const maxVisibility = units === 'imperial' ? 10 : 16; // 10 miles or 16 km
  const unit = units === 'imperial' ? 'mi' : 'km';

  if (visibility >= maxVisibility) {
    return 'Unlimited';
  } else if (visibility < 0.1) {
    return `< 0.1 ${unit}`;
  } else {
    return `${visibility.toFixed(1)} ${unit}`;
  }
}

export default formatVisibility