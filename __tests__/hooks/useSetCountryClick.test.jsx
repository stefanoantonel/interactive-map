import { render, screen } from '@testing-library/react';
import { Provider } from 'jotai';
import { useHydrateAtoms } from 'jotai/utils';
import { useRef } from 'react';
import userEvent from '@testing-library/user-event';

import useMap from '@/hooks/useMap';
import { selectedCountryCodeAtom } from '@/state/country';
import useSetCountryOnClick from '@/hooks/useSetCountryOnClick';

describe('useSetCountryOnClick', () => {
  it('does fetch info on click', async () => {
    render(<ProviderComponent />);

    window.scrollTo = jest.fn();
    global.fetch = jest.fn(() => Promise.resolve({ json: () => Promise.resolve(null) }));

    const user = userEvent.setup();
    const mapImg = await screen.findByText('', { selector: 'img' });
    await user.click(mapImg);
    expect(global.fetch).toHaveBeenCalled();
  });

  it('does not fetch info if not clicked', async () => {
    render(<ProviderComponent />);

    window.scrollTo = jest.fn();
    global.fetch = jest.fn(() => Promise.resolve({ json: () => Promise.resolve(null) }));

    expect(global.fetch).not.toHaveBeenCalled();
  });

  function ProviderComponent() {
    return (
      <TestProvider initialValues={[[selectedCountryCodeAtom, null]]}>
        <Component />
      </TestProvider>
    );
  }

  function Component() {
    const mapContainerRef = useRef(null);
    const mapRef = useMap(mapContainerRef);

    useSetCountryOnClick(mapRef);

    return (
      <>
        <div ref={mapContainerRef}></div>
      </>
    );
  }
});

function TestProvider({ initialValues, children }) {
  return (
    <Provider>
      <HydrateAtoms initialValues={initialValues}>{children}</HydrateAtoms>
    </Provider>
  );
}

const HydrateAtoms = ({ initialValues, children }) => {
  useHydrateAtoms(initialValues);
  return children;
};
