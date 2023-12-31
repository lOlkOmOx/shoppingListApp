import React, { createContext, useContext, useState } from "react";
import en from "../language/en.json"
import cz from "../language/cz.json"
import de from "../language/de.json"

const translations = {en, cz, de}

const TranslationContext = createContext();

export const useTranslation = () => useContext(TranslationContext);

export const Translation = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState('de');
  const [Translations, setTranslations] = useState(translations[currentLanguage]);

  const changeLanguage = (newLanguage) => {
    setCurrentLanguage(newLanguage);
    setTranslations(translations[newLanguage]);
  };

  return (
    <TranslationContext.Provider value={{ t: Translations, changeLanguage }}>
      {children}
    </TranslationContext.Provider>
  );
};