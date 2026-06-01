import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '../lib/base44-client';
import { useLanguage } from '../context/LanguageContext'; 

export default function BranchesPage() {
  const { t, language } = useLanguage();
  const [showForm, setShowForm] = useState(false);

  const { data: branches = [], isLoading } = useQuery({
    queryKey: ['branches'],
    queryFn: () => base44.entities.Branch.list(),
  });

  return (
    <div className="p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{t('branches')}</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            {language === 'zh' ? `共 ${branches.length} 間分店` : `${branches.length} branches`}
          </p>
        </div>
        <button 
          onClick={() => setShowForm(true)}
          className="bg-black text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors"
        >
          + {t('addBranch')}
        </button>
      </div>

      {isLoading ? (
         <div className="text-center py-12 text-gray-500">{t('loading')}</div>
      ) : branches.length === 0 ? (
         <div className="text-center py-16 text-gray-500 border-2 border-dashed border-gray-300 rounded-lg mt-8">
           {t('noData') || 'No branches found. Click "Add Branch" to start.'}
         </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {branches.map(branch => (
            <div key={branch.id} className="border border-gray-200 rounded-lg p-5 shadow-sm">
              <h3 className="font-semibold">{branch.name_en || branch.name_zh || 'Unnamed Branch'}</h3>
              <p className="text-xs text-gray-500 mt-1">{branch.address || 'No address provided'}</p>
            </div>
          ))}
        </div>
      )}
      
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
           <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-xl">
             <h2 className="text-lg font-bold mb-4">Add Branch Modal</h2>
             <p className="text-sm text-gray-500 mb-6">
               Your database logic is working flawlessly! You can now start importing your custom UI components (like BranchFormModal) back into the app one by one to find out which specific file was causing the crash.
             </p>
             <button 
               onClick={() => setShowForm(false)} 
               className="w-full bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md font-medium"
             >
               Close Test Modal
             </button>
           </div>
        </div>
      )}
    </div>
  );
}
