import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '../lib/base44-client';
import { useLanguage } from '../context/LanguageContext'; 

export default function BranchesPage() {
  const { t, language } = useLanguage();

  const { data: branches = [], isLoading, error } = useQuery({
    queryKey: ['branches'],
    queryFn: () => base44.entities.Branch.list(),
  });

  if (error) {
    return (
      <div style={{ padding: '50px', textAlign: 'center', color: 'red' }}>
        <h2>Database Error!</h2>
        <p>{error.message}</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '50px', textAlign: 'center' }}>
      <h1>{t('branches')} Database Test</h1>
      
      {isLoading ? (
        <p>Connecting to database...</p>
      ) : (
        <div>
          <p style={{ color: 'green', fontWeight: 'bold' }}>Success! Connected to database.</p>
          <p>Found {branches.length} branches.</p>
        </div>
      )}
    </div>
  );
}
