'use client';

import styled from 'styled-components';
import 'leaflet/dist/leaflet.css';
import { useRef } from 'react';

import useMap from '@/hooks/useMap';
import useSetCountryOnClick from '@/hooks/useSetCountryOnClick';

const Container = styled.div`
  z-index: 1;
  width: 100%;
  height: 80vh;
  &.leaflet-grab {
    /* to hint the user that they can click on the map */
    cursor: pointer;
  }
`;

export default function InteractiveMap() {
  const mapContainerRef = useRef(null);
  const mapRef = useMap(mapContainerRef);

  // set country code on map click
  useSetCountryOnClick(mapRef);

  return <Container ref={mapContainerRef}></Container>;
}
