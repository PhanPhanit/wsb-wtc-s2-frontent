import React, {useState, createContext, useContext} from 'react';


const LanguageContext = createContext();
const LanguageContextProvider = ({children}) => {
    const [language, setLanguage] = useState('en');
    const setLanguageEn = () => {
        setLanguage('en');
    }
    const setLanguageKh = () => {
        setLanguage('kh');
    }
    return <LanguageContext.Provider value={{ 
        language,
        setLanguageEn,
        setLanguageKh
     }}>{children}</LanguageContext.Provider>
}
const useLanguageContext = () => {
    return useContext(LanguageContext);
}

export {
    LanguageContextProvider,
    useLanguageContext
}