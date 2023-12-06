import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import translations from '../lang';

interface Translations {
  [key: string]: Record<string, string>;
};

const typedTranslations: Translations = translations;

interface LanguageContextProps {
  language: string;
  translations: Record<string, string>;
  changeLanguage: (newLanguage: string) => void;
}

const LanguageContext = React.createContext<LanguageContextProps | undefined>(undefined);
export function useLanguageContext() {
  const value = React.useContext(LanguageContext);
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useSession must be wrapped in a <LanguageProvider />');
    }
  }
  
  return value;
}

interface LanguageProviderProps {
  children: React.ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({children}) => {
  const [language, setLanguage] = React.useState('jp');
  
  React.useEffect(() => {
    (async () => {
      await AsyncStorage.getItem('language')
        .then(r => setLanguage(r || 'jp'));
    })();
  },[]);
  
  const changeLanguage = async (newLanguage: string) => {
    await AsyncStorage.setItem('language', newLanguage);
    setLanguage(newLanguage);
  };
  
  const contextValue: LanguageContextProps = {
    language,
    translations: typedTranslations[language],
    changeLanguage: (newLanguage: string) => {changeLanguage(newLanguage)},
  };
  
  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
}
