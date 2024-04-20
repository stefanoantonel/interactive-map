import { useEffect, useState } from 'react';
import { ApolloClient, InMemoryCache, NormalizedCacheObject } from '@apollo/client';

import config from '@/config.json';

export default function useClient() {
  const [client, setClient] = useState<ApolloClient<NormalizedCacheObject>>();

  useEffect(() => {
    if (client) return;

    const newClient = new ApolloClient({
      cache: new InMemoryCache(),
      uri: config.graphQLEndpoint,
    });

    setClient(newClient);
  }, [client]);

  return client;
}
