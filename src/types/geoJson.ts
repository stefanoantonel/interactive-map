type Feature = {
  type: 'Feature';
  id: string;
  properties: {
    name: string;
  };
  geometry: {
    type: 'Polygon';
    coordinates: number[][][];
  };
};

export type GeoJsonType = {
  features: Feature[];
  type: 'FeatureCollection';
};
