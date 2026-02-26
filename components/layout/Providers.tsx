'use client';

import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { ideaChainTheme } from '@/lib/theme';
import { AuthProvider } from '@/lib/authContext';

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: { queries: { staleTime: 60 * 1000 } },
  }));
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={ideaChainTheme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </QueryClientProvider>
    </AuthProvider>
  );
}
