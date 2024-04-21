import { render, screen } from '@testing-library/react';
import { useQuery } from '@apollo/client';

import InteractiveMap from '@/components/InteractiveMap';
import { countryInfoMock } from './mock/mockCountryInfo';
import { beforeEach } from 'node:test';

// jest.mock('@apollo/client', () => ({
//   ...jest.requireActual('@apollo/client'),
//   useQuery: jest.fn(),
// }));

describe('InteractiveMap', () => {
  it('renders copyright', () => {
    render(<InteractiveMap />);
    screen.getByText('©', { selector: 'div' });
    screen.getByText('OpenStreetMap', { selector: 'a' });
  });
  it('renders controls', () => {
    render(<InteractiveMap />);
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBe(2);
    screen.getByText('+', { selector: 'span' });
    screen.getAllByText('−', { selector: 'span' });
  });
});
