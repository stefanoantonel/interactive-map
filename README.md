# Interactive Map app

Interactive map using GraphQL data from https://github.com/trevorblades/countries

### Checkout [Demo](https://stefanoantonel.github.io/interactive-map/) 🗺

<p>
  <img src="https://raw.githubusercontent.com/stefanoantonel/interactive-map/images/public/desktop.png" alt="Preview map in desktop." width="700">
  <img src="https://raw.githubusercontent.com/stefanoantonel/interactive-map/images/public/mobile.png" alt="Preview map in mobile" width="213">
</p>

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3003](http://localhost:3003) with your browser to see the result.

## Improvements / TODOs

- Typescript for graphql queries
- Better cache mechanism
- Create PR to https://github.com/annexare/Countries adding divisions in CH, AR
- Add Sentry

## This source uses:

- https://leafletjs.com for interactive map and data provided by OpenStreetMap
- https://github.com/johan/world.geo.json for country boundries highlight
- https://www.geonames.org to obtain country based on coordinates and get also ISO country code
- https://react-select.com autocomplete dropdown for country selection
