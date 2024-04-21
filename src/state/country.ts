import { GeoJsonType } from '@/types/geoJson';
import { atom } from 'jotai';

export const selectedCountryCodeAtom = atom<string | null>('CH');

export const geoJsonDataAtom = atom<GeoJsonType | null>(null);
