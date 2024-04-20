import { useSetAtom } from 'jotai';
import { MutableRefObject, useEffect } from 'react';
import { popup as LPopup, Map } from 'leaflet';

import { selectedCountryCodeAtom } from '@/state/country';
import { getContryCodeByCoordinates } from '@/helpers/coordinates';

export default function useSetCountryOnClick(mapRef: MutableRefObject<Map | null>) {
  const setSelectedCountryCode = useSetAtom(selectedCountryCodeAtom);

  useEffect(() => {
    // react to click event
    if (!mapRef?.current) return;

    mapRef.current.on('click', (e) => {
      const popup = LPopup();
      popup.setLatLng(e.latlng).setContent('Loading information...').openOn(mapRef.current!);

      getContryCodeByCoordinates(e.latlng.lat, e.latlng.lng)
        .then((countryCode) => {
          popup.close();
          setSelectedCountryCode(countryCode.trim());
        })
        .catch(() => {
          popup.setContent('Error: No data found for this point');
          setSelectedCountryCode(null);
        });
    });
  }, [mapRef, setSelectedCountryCode]);
}
