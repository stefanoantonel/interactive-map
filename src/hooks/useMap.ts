import { MutableRefObject, useEffect, useRef } from 'react';
import { Map, map, tileLayer, control } from 'leaflet';

export default function useMap(containerRef: MutableRefObject<null>) {
  const mapRef = useRef<Map | null>(null);

  useEffect(() => {
    // initialize map
    if (!containerRef.current || mapRef.current) return;

    mapRef.current = map(containerRef.current, {
      zoomControl: false,
    }).setView([51.505, -0.09], 13);

    tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 6,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(mapRef.current);

    control.zoom({ position: 'topright' }).addTo(mapRef.current);

    return () => {
      // clean up when unmount
      if (!mapRef.current) return;

      mapRef.current.remove();
      mapRef.current = null;
    };
  }, [containerRef, mapRef]);

  return mapRef;
}
