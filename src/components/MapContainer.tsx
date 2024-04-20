'use client';

import dynamic from 'next/dynamic';
// force to not ssr
const InteractiveMap = dynamic(() => import('@/components/InteractiveMap'), {
  ssr: false,
});

export default function MapContainer() {
  return <InteractiveMap />;
}
