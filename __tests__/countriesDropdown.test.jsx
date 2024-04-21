import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { useQuery } from '@apollo/client';

import CountriesDropdown from '@/components/CountriesDropdown';
import countriesMock from './mock/countries';

jest.mock('@apollo/client', () => ({
  ...jest.requireActual('@apollo/client'),
  useQuery: jest.fn(),
}));

describe('CountriesDropwown', () => {
  it('renders error', () => {
    useQuery.mockReturnValue({
      data: null,
      loading: false,
      error: new Error('test error'),
    });
    render(<CountriesDropdown />);
    screen.getByText('Error: test error');
  });
  it('renders loading', () => {
    useQuery.mockReturnValue({
      data: null,
      loading: true,
      error: null,
    });
    render(<CountriesDropdown />);
    screen.getByText('Search country');
  });
  it('renders when data is null', async () => {
    const user = userEvent.setup();
    useQuery.mockReturnValue({
      data: null,
      loading: false,
      error: null,
    });
    render(<CountriesDropdown />);
    const dropwownInput = screen.getByRole('combobox');
    await user.type(dropwownInput, 'Brasil');
    screen.getByText('No options');
  });

  it('renders info data', async () => {
    const user = userEvent.setup();

    useQuery.mockReturnValue({
      data: countriesMock,
      loading: false,
      error: null,
    });
    render(<CountriesDropdown />);
    const dropwownInput = screen.getByRole('combobox');

    // options are displayed
    await user.type(dropwownInput, 'A');
    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(3);

    // option is shown with specific text
    await user.clear(dropwownInput);
    await user.type(dropwownInput, 'Andorra');
    screen.getByText('Andorra', { selector: 'div[role="option"]' });
  });
});
