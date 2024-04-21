import { render, screen } from '@testing-library/react';

import InteractiveMap from '@/components/InteractiveMap';

jest.mock('@/hooks/useCountryHighlight', () => jest.fn());
jest.mock('@/hooks/useSetCountryOnClick', () => jest.fn());

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
