import React, {useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import translations from '../lang';
import {Modal, StyleSheet, Text, View} from "react-native";
import LanguageModal from "../components/LanguageModal";

interface Translations {
  [key: string]: Record<string, string>;
}

const typedTranslations: Translations = translations;

interface LanguageContextProps {
  language: string;
  translations: Record<string, string>;
  changeLanguage: (newLanguage: string) => void;
  handlePress: (userPreferredLanguage: string) => Promise<void>;
}

const LanguageContext = React.createContext<LanguageContextProps>(
  {
    language: 'jp',
    translations: {},
    changeLanguage: () => {},
    handlePress: (userPreferredLanguage: string) => Promise<void>
  }
);
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
  const [showModal, setShowModal] = useState(false);

  React.useEffect(() => {
    (async () => {
      await AsyncStorage.getItem('language')
        .then(r => {
          (r === null) ? setShowModal(true) : setLanguage(r || 'jp');
        });
    })();
  }, []);

  const changeLanguage = async (newLanguage: string) => {
    await AsyncStorage.setItem('language', newLanguage);
  };

  const handlePress = async (userPreferredLanguage: string) => {
    await changeLanguage(userPreferredLanguage);
    setShowModal(false);
  };

  const contextValue: LanguageContextProps = {
    language,
    translations: typedTranslations[language],
    changeLanguage: (newLanguage: string) => {
      changeLanguage(newLanguage)
        .then(() => setLanguage(newLanguage));
    },
    handlePress
  };

  return (
    <LanguageContext.Provider value={contextValue}>
      {showModal && <LanguageModal />}
      {children}
    </LanguageContext.Provider>
  );
}

const styles = StyleSheet.create({
  language: {
    width: 100,
    backgroundColor: '#ADD2FF',
    padding: 10,
    borderRadius: 4
  },
});