import { atom } from 'jotai';

import { geoJsonDataAtom } from './country';
import config from '@/config.json';

export const setGeoJsonInfoAtom = atom<null, [], void>(null, async (get, set) => {
  fetch(config.countriesBordersEndpoint)
    .then((res) => res.json())
    .then((data) => {
      set(geoJsonDataAtom, data);
    });
});
