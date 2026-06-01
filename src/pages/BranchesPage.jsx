import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '../lib/base44-client';
import { useLanguage } from '../context/LanguageContext'; 

export default function BranchesPage() {
  const { t } = useLanguage();
  const [showForm, setShowForm] = useState(false);

  const { data: branches = [], isLoading } = useQuery({
    queryKey: ['branches'],
    queryFn: () => base44.entities.Branch.list(),
  });

  return (
    <div className="p-6">
      <h1>{t('branches')}</h1>
      {/* We will add the Button component below */}
    </div>
  );
}
