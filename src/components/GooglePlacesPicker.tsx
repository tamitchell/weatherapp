import { PlacePicker } from '@googlemaps/extended-component-library/react';
import clsx from 'clsx';
import { memo } from 'react';

export default memo(function GooglePlacesPicker({
  handlePlaceChange,
}: {
  handlePlaceChange: (e: Event) => void;
}): JSX.Element {
  return (
    <div className="custom-place-picker w-full">
      <PlacePicker
        className={clsx(
          "w-full h-full",
          "transition-colors duration-200",
          "focus:outline-none focus:ring-2 focus:ring-ring",
        )}
        style={{
          fontSize: '16px', //prevent autozoom on ios/safari devices
          touchAction: 'manipulation',
        }}
        placeholder="Enter a location name or address"
        onPlaceChange={handlePlaceChange}
      />
    </div>
  );
});
