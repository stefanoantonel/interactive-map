import config from '@/config.json';

export function getCountryCodeISO(countryCode: string, signal?: AbortSignal) {
  // get from "DE" to "DEU" to fetch country border
  const endpoint = config.countryNameEndpoint.replace('<COUNTRY_CODE>', countryCode);

  return fetch(endpoint, { signal })
    .then((res) => res.text())
    .then((data) => {
      const isoName = data.match('<isoAlpha3>(.+)</isoAlpha3>')?.[1];
      return isoName || null;
    })
    .catch((e) => {
      if (e?.message === 'signal is aborted without reason') return;
      throw e;
    });
}