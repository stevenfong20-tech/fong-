import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { LanguageProvider } from './context/LanguageContext';
import BranchesPage from './pages/BranchesPage';

// This creates the "engine" for fetching data
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <BranchesPage />
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
