import { useQuery } from '@apollo/client';
import { useAtom } from 'jotai';
import { useEffect, useMemo, useRef } from 'react';
import Select from 'react-select';
import styled from 'styled-components';

import { LIST_COUNTRIES } from '@/queries/countries';
import { selectedCountryCodeAtom } from '@/state/country';
import { Country } from '@/types/graphql';

type OptionType = {
  value: string;
  label: string;
};

export default function CountriesDropdown() {
  const [selectedCountryCode, setSelectedCountryCode] = useAtom(selectedCountryCodeAtom);
  const selectRef = useRef<any>(null);

  const { data, loading, error } = useQuery(LIST_COUNTRIES);

  const options = useMemo(() => {
    if (!data?.countries) return [];

    const opts: OptionType[] = (data.countries as Country[]).map(
      (country) =>
        ({
          value: country.code,
          label: country.name,
        }) satisfies OptionType
    );
    return opts?.sort((a, b) => a.label.localeCompare(b.label)) || [];
  }, [data?.countries]);

  useEffect(() => {
    if (!selectedCountryCode || !selectRef.current) return;

    // clean select when clicked on other country
    const inputValue = selectRef.current?.getValue()?.[0]?.value;
    if (selectedCountryCode !== inputValue) {
      selectRef.current.clearValue();
    }
  }, [selectedCountryCode]);

  const onChange = (selected: OptionType | null) => {
    if (!selected) return;
    setSelectedCountryCode(selected.value);
  };

  if (error) return <div>Error: {error.message}</div>;

  return (
    <Container>
      <Select
        ref={selectRef}
        isLoading={loading}
        isDisabled={loading}
        isClearable={true}
        isSearchable={true}
        options={options}
        placeholder={'Search country'}
        onChange={onChange}
      />
      <ResetBtn title="Reset" onClick={() => setSelectedCountryCode(null)}>
        ⟳
      </ResetBtn>
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-columns: auto 30px;
  gap: 10px;
  align-items: center;
  padding: 10px;
`;

const ResetBtn = styled.button`
  font-size: 2rem;
  background-color: transparent;
  border: none;
  color: black;
`;
