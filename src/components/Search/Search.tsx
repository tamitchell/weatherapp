'use client';

import clsx from 'clsx';
import dynamic from 'next/dynamic';
import { memo } from 'react';
import { baseStyles } from '../../styles/styles';
import { useGeolocationQuery } from 'src/hooks/queries/useGeolocationQuery';

export default memo(function Search() {
  const { updateLocation } = useGeolocationQuery();

  const PlacePicker = dynamic(
    () => import('../GooglePlacesPicker').then((mod) => mod.default),
    { ssr: false }
  );

  //Set any here because google response is a proxy that obfiscates the object into getters
  //@ts-expect-error Google Place Picker passes an unknown event
  const handlePlaceChanged = (event) => {
    const place = event.target?.value;
    if (place && place.location) {
      updateLocation({
        lat: place.location.lat(),
        lng: place.location.lng(),
        address: place.formatted_address,
      });
    } else {
      console.error('Place data is incomplete or unavailable');
    }
  };
  // const handlePlaceChanged = (event) => {
  //   const place = event.target?.value;
  //   if (place && place.location) {
  //     const selectedPlace: GooglePlace = {
  //       formatted_address: place.formatted_address,
  //       lat: place.location.lat(),
  //       lng: place.location.lng(),
  //     };

  //     setAddress(selectedPlace.formatted_address);

  //     // Invalidate current queries to trigger refetch with new coordinates
  //     queryClient.invalidateQueries({
  //       queryKey: [
  //         'weather',
  //         {
  //           lat: selectedPlace.lat,
  //           lng: selectedPlace.lng,
  //         },
  //       ],
  //     });
  //   } else {
  //     //throw error
  //     console.error('Place data is incomplete or unavailable');
  //   }
  // };

  return (
    <div className={clsx(baseStyles.flexCenter, 'w-full')}>
      <PlacePicker handlePlaceChange={handlePlaceChanged} />
    </div>
  );
});
