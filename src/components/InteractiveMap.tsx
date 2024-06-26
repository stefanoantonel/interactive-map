'use client';

import styled from 'styled-components';
import 'leaflet/dist/leaflet.css';
import { useRef } from 'react';

import useMap from '@/hooks/useMap';
import useCountryHighlight from '@/hooks/useCountryHighlight';
import useSetCountryOnClick from '@/hooks/useSetCountryOnClick';

export default function InteractiveMap() {
  const mapContainerRef = useRef(null);
  const mapRef = useMap(mapContainerRef);

  // set country code on map click
  useSetCountryOnClick(mapRef);

  // will highlight country border on click
  useCountryHighlight(mapRef);

  return <Container ref={mapContainerRef}></Container>;
}

const Container = styled.div`
  z-index: 1;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  &.leaflet-grab {
    /* to hint the user that they can click on the map */
    cursor: pointer;
  }

  @media (max-width: 768px) {
    height: 55vh;
  }
`;
