'use client';
import { ApolloProvider } from '@apollo/client';
import { useAtomValue } from 'jotai';
import styled from 'styled-components';

import CountryInfo from '@/components/CountryInfo';
import useClient from '@/hooks/useClient';
import CountriesDropdown from './CountriesDropdown';
import { selectedCountryCodeAtom } from '@/state/country';
import Loader from '@/components/Loader';

const Container = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 1;
  background-color: #f1f0e9;
  color: black;
  display: flex;
  flex-direction: column;
  width: 300px;
  border-radius: 5px;
  border: 1px solid;

  @media (max-width: 768px) {
    position: relative;
    width: 100%;
    top: 0;
    left: 0;
    padding: 10px;
    height: 30vh;
  }
`;

const LoaderContainer = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function CountryCardContainer() {
  const client = useClient();
  const selectedCountryCode = useAtomValue(selectedCountryCodeAtom);

  if (!client)
    return (
      <LoaderContainer>
        <Loader />
      </LoaderContainer>
    );

  return (
    <Container>
      <ApolloProvider client={client}>
        <CountriesDropdown />
        {selectedCountryCode && <CountryInfo countryCode={selectedCountryCode} />}
      </ApolloProvider>
    </Container>
  );
}
