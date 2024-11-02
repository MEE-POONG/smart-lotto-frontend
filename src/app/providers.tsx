// app/providers.tsx
'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  const [persister, setPersister] = useState<ReturnType<typeof createSyncStoragePersister> | null>(null);

  useEffect(() => {
    const storagePersister = createSyncStoragePersister({
      storage: window.localStorage,
    });
    setPersister(storagePersister);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {persister ? (
        <PersistQueryClientProvider client={queryClient} persistOptions={{ persister }}>
          {children}
          <ReactQueryDevtools />
        </PersistQueryClientProvider>
      ) : (
        children
      )}
    </QueryClientProvider>
  );
}