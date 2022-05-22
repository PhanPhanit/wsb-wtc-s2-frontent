import { useLanguageContext } from './context/language_context';
import * as languages from './languages';

const useTranslate = (text) => {
  const { language } = useLanguageContext();

  // return the translated text or the original text
  if (Object.keys(languages).includes(language)) {
    return languages[language][text] || text;
  }
  return text;
};

const translateText = (language, text) => {
  if (Object.keys(languages).includes(language)) {
    return languages[language][text] || text;
  }
  return text;
}

const Translate = ({ children }) => {
  return useTranslate(children);
};

export {
  translateText,
  useTranslate
}

export default Translate;