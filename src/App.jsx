import React from 'react';
import { LanguageProvider } from './context/LanguageContext';
import BranchesPage from './pages/BranchesPage';

function App() {
  return (
    <LanguageProvider>
      <BranchesPage />
    </LanguageProvider>
  );
}

export default App;
