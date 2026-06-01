import React from 'react';
import { useLanguage } from '../context/LanguageContext'; 

export default function BranchesPage() {
  const { t, language } = useLanguage();

  return (
    <div style={{ padding: '50px', textAlign: 'center' }}>
      <h1>Page Test is Working!</h1>
      <p>Current Language is: {language}</p>
      <p>Translation says: {t('branches')}</p>
    </div>
  );
}
