import config from '@/config.json';

export function getContryCodeByCoordinates(lat: number, lng: number) {
  const endpoint = config.reverseGeolocEndpoint
    .replace('<LAT>', lat.toString())
    .replace('<LNG>', lng.toString());
  return fetch(endpoint).then((res) => res.text());
}
