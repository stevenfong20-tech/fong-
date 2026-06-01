import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '../lib/base44-client';
import { useLanguage } from '../context/LanguageContext'; 
// 1. ADD THIS IMPORT LINE
import { Button } from '../components/ui/button';

export default function BranchesPage() {
  const { t } = useLanguage();
  const [showForm, setShowForm] = useState(false);

  const { data: branches = [], isLoading } = useQuery({
    queryKey: ['branches'],
    queryFn: () => base44.entities.Branch.list(),
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{t('branches')}</h1>
      
      {/* 2. ADD THIS COMPONENT */}
      <div className="mt-4">
        <Button onClick={() => setShowForm(true)}>
          + {t('addBranch')}
        </Button>
      </div>

      <div className="mt-6">
        {isLoading ? <p>{t('loading')}</p> : <p>{branches.length} branches found.</p>}
      </div>
    </div>
  );
}
