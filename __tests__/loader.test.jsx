import { render, screen } from '@testing-library/react';
import { useQuery } from '@apollo/client';

import Loader from '@/components/Loader';

describe('Loader', () => {
  it('renders', () => {
    render(<Loader />);
    screen.getByTestId('loader-component');
  });
});
