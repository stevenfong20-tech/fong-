import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en'); // Default to English

  // This 't' function handles the translations
  const t = (key) => {
    const translations = {
      en: { branches: 'Branches', addBranch: 'Add Branch', loading: 'Loading...', noData: 'No branches found.' },
      zh: { branches: '分店', addBranch: '新增分店', loading: '載入中...', noData: '查無分店數據' }
    };
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
