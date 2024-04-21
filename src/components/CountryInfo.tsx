import styled from 'styled-components';
import { useQuery } from '@apollo/client';

import { COUNTRY_INFO } from '@/queries/countries';
import { CountryInfoType } from '@/types/graphql';

const Container = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: column;
  padding: 10px;
`;

const CountryTitle = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  margin: 8px 0;
  color: #aad3df;
  text-align: center;
`;

type Props = {
  countryCode: string;
};

export default function CountryInfo({ countryCode }: Props) {
  const { data, loading, error } = useQuery(COUNTRY_INFO, {
    variables: { countryCode: countryCode },
  });

  if (error) return <div>Error: {error.message}</div>;

  if (loading) return <div>Loading country info...</div>;

  if (!data?.country) return <div>Data not available</div>;

  const countryData: CountryInfoType = data.country;

  const languagesValue = countryData.languages.reduce((acc, lang) => {
    return `${acc} ${acc ? '-' : ''} ${lang.name}`;
  }, '');

  return (
    <Container>
      <CountryTitle>📍{countryData.name}</CountryTitle>
      <Item name="Flag" value={countryData.emoji} />
      <Item name="Capital" value={countryData.capital} />
      <Item name="Continent" value={countryData.continent.name} />
      <Item name="Currency" value={countryData.currency} />
      <Item name="Phone code" value={`+ ${countryData.phone}`} />
      <Item name="Subdivisions" value={countryData.states.length} />
      <Item name="Languages" value={languagesValue} />
    </Container>
  );
}

type ItemProps = {
  name: string;
  value: string | number;
};

export function Item({ name, value }: ItemProps) {
  return (
    <div>
      <strong>{name}: </strong>
      <span>{value}</span>
    </div>
  );
}
