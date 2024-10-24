import { PlacePicker } from '@googlemaps/extended-component-library/react';
import clsx from 'clsx';
import { memo } from 'react';

export default memo(function GooglePlacesPicker({
  handlePlaceChange,
}: {
  handlePlaceChange: (e: Event) => void;
}): JSX.Element {
  return (
    <div className="custom-place-picker">
      <PlacePicker
        className={clsx(
          'w-full h-full border-gray-300 text-gray-700 bg-gray-100 custom-place-picker'
        )}
        placeholder="Enter a location name or address"
        onPlaceChange={handlePlaceChange}
      />
    </div>
  );
});
