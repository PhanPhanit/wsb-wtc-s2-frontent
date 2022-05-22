import React from 'react'
import '../styles/category.css';
import Translate from '../Translate';
import { useLanguageContext } from '../context/language_context';

const Category = ({title}) => {
    const {language} = useLanguageContext();
    return (
        <section className="wrapper-global category">
            <h2 className={language=='kh'?"font-cat font-khmer":"font-cat font-poppin"}><Translate>{title}</Translate></h2>
        </section>
    )
}

export default Category
