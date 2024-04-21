# Interactive Map app

Interactive map using GraphQL data from https://github.com/trevorblades/countries

### Checkout [Demo](https://stefanoantonel.github.io/interactive-map/) 🗺

<p>
  <img src="https://raw.githubusercontent.com/stefanoantonel/interactive-map/main/public/desktop.png" alt="Preview map in desktop." width="600">
  <img src="https://raw.githubusercontent.com/stefanoantonel/interactive-map/main/public/mobile.png" alt="Preview map in mobile" width="183">
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

- https://github.com/trevorblades/countries for country infomation and list of countries
- https://leafletjs.com for interactive map and data provided by OpenStreetMap
- https://github.com/johan/world.geo.json for country boundries highlight
- https://www.geonames.org to obtain country based on coordinates and get also ISO country code
- https://react-select.com autocomplete dropdown for country selection

## Sequence Diagram

To understand a bit better the interaction with the libraries and different APIs see diagram.

<!-- prettier-ignore -->
```mermaid
sequenceDiagram
  actor U as User
  participant A as App
  participant L as Leafletjs lib
  participant G as Geonames API
  participant B as Johan/world.geo.json
  participant Q as Trevorblades/countries API


  par
    A->>L: Build map
  and
    A->>Q: Get list of countries
  and
    A->>B: Load countries boundries JSON
  end
  L->>A: 
  B->>A: 
  Q->>A: 
  A->>U: Display map
  A->>A: Build dropdown
  A->>U: Display dropdown
  U->>A: Click on the map
  A->>L: Get coordinates
  L->>A: 
  A->>G: Get country code from coords
  G->>A: 
  par
    A->>Q: Get country information
  and
    A->>G: Get country ISO code from code
  end
  Q->>A: 
  G->>A: 
  A->>U: Display information card
  A->>A: Find boundries from boundries using ISO country code
  A->>U: Display boundries
```
