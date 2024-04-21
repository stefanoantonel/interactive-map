import { render, screen } from '@testing-library/react';
import { useQuery } from '@apollo/client';

import CountryInfo, { Item } from '@/components/CountryInfo';
import countryInfoMock from './mock/mockCountryInfo.json';

jest.mock('@apollo/client', () => ({
  ...jest.requireActual('@apollo/client'),
  useQuery: jest.fn(),
}));

describe('CountryInfo', () => {
  it('renders loading', () => {
    useQuery.mockReturnValue({
      data: null,
      loading: true,
      error: null,
    });
    render(<CountryInfo />);
    screen.getByText('Loading country info...');
  });
  it('renders error', () => {
    useQuery.mockReturnValue({
      data: null,
      loading: false,
      error: new Error('test error'),
    });
    render(<CountryInfo />);
    screen.getByText('Error: test error');
  });
  it('handle lack of data', () => {
    useQuery.mockReturnValue({
      data: null,
      loading: false,
      error: null,
    });
    render(<CountryInfo />);
    screen.getByText('Select a country to display information');
  });
  it('renders info data', () => {
    useQuery.mockReturnValue({
      data: countryInfoMock,
      loading: false,
      error: null,
    });
    render(<CountryInfo />);

    screen.getByText('Flag:', { selector: 'strong' });

    screen.getByText('Capital:', { selector: 'strong' });
    screen.getByText('Brasília', { selector: 'span' });

    screen.getByText('Continent:', { selector: 'strong' });
    screen.getByText('South America', { selector: 'span' });

    screen.getByText('Currency:', { selector: 'strong' });
    screen.getByText('BRL', { selector: 'span' });

    screen.getByText('Phone code:', { selector: 'strong' });
    screen.getByText('+ 55', { selector: 'span' });

    screen.getByText('Subdivisions:', { selector: 'strong' });
    screen.getByText('2', { selector: 'span' });

    screen.getByText('Languages:', { selector: 'strong' });
    screen.getByText('Portuguese', { selector: 'span' });
  });
});

describe('Item', () => {
  it('renders properly', () => {
    render(<Item name="title" value="value" />);
    screen.getByText('title:', { selector: 'strong' });
    screen.getByText('value', { selector: 'span' });
  });
});
