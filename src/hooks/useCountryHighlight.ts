import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { Map, geoJson, GeoJSON } from 'leaflet';
import { useAtomValue } from 'jotai';

import { geoJsonDataAtom, selectedCountryCodeAtom } from '@/state/country';
import { getCountryCodeISO } from '@/helpers/countryCodes';

export default function useCountryHighlight(mapRef: MutableRefObject<Map | null>) {
  const selectedCountryCode = useAtomValue(selectedCountryCodeAtom);
  const [countryCodeISO, setCountryCodeISO] = useState<string | null>(null);
  const geoJsonData = useAtomValue(geoJsonDataAtom);
  const previousCountryLayer = useRef<GeoJSON<any, any> | null>(null);

  useEffect(() => {
    // convert "DE" to "DEU" to fetch country border
    if (!selectedCountryCode) return;

    const controller = new AbortController();
    getCountryCodeISO(selectedCountryCode, controller.signal).then((iso) => {
      if (!iso) throw new Error(`No ISO country code found for ${selectedCountryCode}`);
      setCountryCodeISO(iso);
    });

    return () => {
      controller.abort();
    };
  }, [selectedCountryCode]);

  useEffect(() => {
    if (!mapRef.current || !geoJsonData || !countryCodeISO) return;

    const countryGeoJson = geoJsonData.features.find((f) => f.id === countryCodeISO);
    if (!countryGeoJson) {
      alert(`Boundries for country ${countryCodeISO} not found`);
      return;
    }

    const country = geoJson(countryGeoJson).addTo(mapRef.current);

    if (previousCountryLayer.current) {
      mapRef.current.removeLayer(previousCountryLayer.current);
    }
    previousCountryLayer.current = country;

    mapRef.current.addLayer(country);
    mapRef.current.fitBounds(country.getBounds());
  }, [mapRef, geoJsonData, countryCodeISO]);
}
