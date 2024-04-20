'use client';

import './globals.css';
import Registry from '../styling/Registry';
import { Provider as JotaiProvider, createStore } from 'jotai';

const store = createStore();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <JotaiProvider store={store}>
          <Registry>{children}</Registry>
        </JotaiProvider>
      </body>
    </html>
  );
}
