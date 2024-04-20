import { GeoJsonType } from '@/types/geoJson';
import { atom } from 'jotai';

export const selectedCountryCodeAtom = atom<string | null>(null);

export const geoJsonDataAtom = atom<GeoJsonType | null>(null);
