import { gql } from '@apollo/client';

export const LIST_COUNTRIES = gql`
  query Countries {
    countries {
      name
      code
    }
  }
`;

export const COUNTRY_INFO = gql`
  query GetCountryInfo($countryCode: ID!) {
    country(code: $countryCode) {
      name
      emoji
      capital
      continent {
        name
      }
      currency
      languages {
        name
      }
      phone
      states {
        code
      }
    }
  }
`;
