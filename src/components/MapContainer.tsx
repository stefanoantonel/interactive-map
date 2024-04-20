'use client';

import { useSetAtom } from 'jotai';
import dynamic from 'next/dynamic';
import { useEffect } from 'react';

import { setGeoJsonInfoAtom } from '@/state/setters';

// force to not ssr
const InteractiveMap = dynamic(() => import('@/components/InteractiveMap'), {
  ssr: false,
});

export default function MapContainer() {
  const setGeoJsonInfo = useSetAtom(setGeoJsonInfoAtom);

  useEffect(() => {
    setGeoJsonInfo();
  }, [setGeoJsonInfo]);

  return <InteractiveMap />;
}
