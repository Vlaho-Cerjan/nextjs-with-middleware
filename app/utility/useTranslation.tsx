import { useContext } from "react";

import { LanguageContext, defaultLocale } from "../store/languageContext";

export default function useTranslation(strings: any) {
  const {locale} = useContext(LanguageContext);

  function t(key: string) {
    if(typeof strings[locale] !== "undefined"){
      if (!strings[locale][key]) {
        console.warn(`No string '${key}' for locale '${locale}'`);
      }
          if(strings[defaultLocale]){
              return strings[locale][key] || strings[defaultLocale][key] || "";
          }
      }
    }

  return { t, locale };
}